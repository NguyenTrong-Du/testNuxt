<template>
  <div>
    <div>
      <h3 class="text-2xl">{{ $t('editprofile.editPersonProfile') }}</h3>
    </div>
    <div v-if="isLoading" class="mt-10">
      <PersonInfo
        :data-individual="dataIndividual"
        :form-data="form"
        :is-edit="true"
      />
    </div>
  </div>
</template>
<script>
import PersonInfo from '~/components/PersonInfo.vue'
export default {
  name: 'EditCompany',
  components: { PersonInfo },
  layout: 'editprofile',
  // middleware: 'authenticated',
  data() {
    return {
      attributes: {},
      dataIndividual: {},
      isLoading: false,
      form: {},
    }
  },
  async created() {
    const dataProfile = await this.$api.getUser()
    const dataAttributes = await this.$api.getAttributes()
    this.attributes = dataAttributes.data
    const profile = dataProfile.data.user
    const jobs = profile.attributes.filter(
      (item) => JSON.parse(item.attributeIds)[0] === this.attributes.jobs.id
    )

    const listJobChildId = jobs.map((item) => JSON.parse(item.attributeIds)[2])
    const choseJobChilds = this.attributes.jobs.childs
      .filter((item) => listJobChildId.includes(item.id))
      .map((item) => item.id)

    const listJobId = jobs.map((item) => JSON.parse(item.attributeIds)[1])
    const listChoseJob = this.attributes.jobs.childs
      .filter((item) => listJobId.includes(item.id))
      .map((item) => item.id)

    const choseJob = listChoseJob[0]
    const listChilds = this.attributes.jobs.childs.filter(
      (job) => job.parent_attribute_id === choseJob
    )
    const listJobChilds = listChilds.map((item) => {
      return {
        label: item.name,
        value: item.id,
      }
    })

    const languages = profile.attributes.filter(
      (item) =>
        JSON.parse(item.attributeIds)[0] === this.attributes.languages.id
    )

    const listLanguageId = languages.map(
      (item) => JSON.parse(item.attributeIds)[1]
    )
    const languageNumber = listLanguageId.length
    const choseLanguage = this.attributes.languages.childs
      .filter((item) => listLanguageId.includes(item.id))
      .map((item) => item.name)

    const listLevelId = languages.map(
      (item) => JSON.parse(item.attributeIds)[2]
    )
    const choseLevel = this.attributes.languages.childs
      .filter((item) => listLevelId.includes(item.id))
      .map((item) => item.name)

    const levels = []
    listLanguageId.forEach((value, index) => {
      levels[index] = this.attributes.languages.childs.filter(
        (language) => language.parent_attribute_id === value
      )
    })

    const programmingLanguages = profile.attributes.filter(
      (item) =>
        JSON.parse(item.attributeIds)[0] ===
        this.attributes.programming_languages.id
    )
    const listprogrammingLanguagesId = programmingLanguages.map(
      (item) => JSON.parse(item.attributeIds)[1]
    )
    const programmingLanguageNumber = listprogrammingLanguagesId.length
    const choseProgrammingLanguages =
      this.attributes.programming_languages.childs
        .filter((item) => listprogrammingLanguagesId.includes(item.id))
        .map((item) => item.name)
    const listProgrammingLanguages = []

    choseProgrammingLanguages.forEach((value, index) => {
      listProgrammingLanguages[index] =
        this.attributes.programming_languages.childs.filter(
          (programmingLanguage) =>
            !choseProgrammingLanguages.includes(programmingLanguage.name) ||
            programmingLanguage.name === value
        )
    })
    const yearsProgrammingLanguages = programmingLanguages.map(
      (item) => item.value
    )

    const translations = profile.attributes.filter(
      (item) =>
        JSON.parse(item.attributeIds)[0] === this.attributes.translations.id
    )

    const listTranslationFromId = translations.map(
      (item) => JSON.parse(item.attributeIds)[1]
    )
    const translationNumber = listTranslationFromId.length
    const choseTranslationFrom = this.attributes.translations.childs
      .filter((item) => listTranslationFromId.includes(item.id))
      .map((item) => item.name)
    const listTranslationToId = translations.map(
      (item) => JSON.parse(item.attributeIds)[2]
    )
    const choseTranslationTo = this.attributes.translations.childs
      .filter((item) => listTranslationToId.includes(item.id))
      .map((item) => item.name)

    const yearsTranslation = translations.map((item) => item.value)

    const listTranslations = this.attributes.translations.childs.filter(
      (translation) =>
        translation.parent_attribute_id === dataAttributes.data.translations.id
    )
    const listTranslationsFrom = listTranslations
    const listTranslation = []

    choseTranslationFrom.forEach((value, index) => {
      listTranslation[index] = {
        from: value,
        to: choseTranslationTo[index],
      }
    })
    const filterIdInArray = (arr, val) => {
      const element = arr.find((item) => item.name === val)
      return element.id
    }

    const getListTranslationTo = (translationIndex, value) => {
      const idTranslation = filterIdInArray(listTranslationsFrom, value)
      const listTranslationsTo = []
      listTranslationsTo[translationIndex - 1] =
        this.attributes.translations.childs.filter(
          (item) => item.parent_attribute_id === idTranslation
        )

      listTranslation.forEach((translation, index) => {
        const isSelectedOption =
          index !== translationIndex - 1 &&
          translation.from === value &&
          translation.to
        if (isSelectedOption) {
          const existSelectOptionId = listTranslationsTo[translationIndex - 1]
            .map((translationTo) => translationTo.name)
            .indexOf(translation.to)
          listTranslationsTo[translationIndex - 1].splice(
            existSelectOptionId,
            1
          )
        }
      })
      return listTranslationsTo[0]
    }
    const listTranslationsTo = []

    choseTranslationFrom.forEach((value, index) => {
      listTranslationsTo[index] = getListTranslationTo(index + 1, value)
    })
    this.form.self_introduction = profile.self_introduction
    this.dataIndividual = {
      choseJob,
      listJobChilds,
      choseJobChilds,
      choseLanguage,
      choseLevel,
      choseProgrammingLanguages,
      yearsProgrammingLanguages,
      yearsTranslation,
      translationNumber,
      languageNumber,
      programmingLanguageNumber,
      listTranslationsTo,
      listTranslationsFrom,
      choseTranslationFrom,
      choseTranslationTo,
      levels,
      listProgrammingLanguages,
      listTranslation,
      profile,
    }
    this.isLoading = true
  },
}
</script>
<style scoped></style>
