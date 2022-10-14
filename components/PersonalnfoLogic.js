import MdAddIcon from 'vue-ionicons/dist/md-add.vue'
import { useCurrentUserStore } from '~/store/user'
export default {
  components: {
    MdAddIcon,
  },
  props: [
    // eslint-disable-next-line vue/require-prop-types
    'formData',
    // eslint-disable-next-line vue/require-prop-types
    'dataIndividual',
    // eslint-disable-next-line vue/require-prop-types
    'isEdit',
  ],
  data() {
    return {
      isLoading: true,
      size: 'large',
      attributes: {},
      translationNumber: this.dataIndividual?.translationNumber || 0,
      languageNumber: this.dataIndividual?.languageNumber || 0,
      programmingLanguageNumber:
        this.dataIndividual?.programmingLanguageNumber || 0,
      formLayout: 'horizontal',
      listJobs: this.dataIndividual?.listJobs || [],
      choseJob: this.dataIndividual?.choseJob || '',
      listJobChilds: this.dataIndividual?.listJobChilds || [],
      choseJobChilds: this.dataIndividual?.choseJobChilds || [],
      translations: [],
      listTranslationsFrom: this.dataIndividual?.listTranslationsFrom || [],
      listTranslationsTo: this.dataIndividual?.listTranslationsTo || [],
      choseTranslationFrom: this.dataIndividual?.choseTranslationFrom || [],
      choseTranslationTo: this.dataIndividual?.choseTranslationTo || [],
      listTranslation: [],
      programmingLanguages: [],
      listProgrammingLanguages:
        this.dataIndividual?.listProgrammingLanguages || [],
      choseProgrammingLanguages:
        this.dataIndividual?.choseProgrammingLanguages || [],
      languages: [],
      choseLanguage: this.dataIndividual?.choseLanguage || [],
      levels: this.dataIndividual?.levels || [],
      choseLevel: this.dataIndividual?.choseLevel || [],
      yearsProgrammingLanguages:
        this.dataIndividual?.yearsProgrammingLanguages || [],
      yearsTranslation: this.dataIndividual?.yearsTranslation || [],
      errorTranslation: false,
      errorLanguage: false,
      errorProgramingLanguage: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  watch: {
    choseJob() {
      const listChilds = this.attributes.jobs.childs.filter(
        (job) => job.parent_attribute_id === this.choseJob
      )
      this.listJobChilds = listChilds.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      })
    },
    choseProgrammingLanguages() {
      this.listProgrammingLanguages = this.programmingLanguages.filter(
        (item) => !this.choseProgrammingLanguages.includes(item.name)
      )
      this.checkValidateProgramingLanguage()
    },
    listTranslation() {
      if (this.listTranslation.length > 0)
        this.choseTranslationFrom.forEach((value, index) => {
          this.getListTranslationTo(index + 1, value)
        })
    },
    choseTranslationTo() {
      if (this.listTranslation.length > 0)
        this.choseTranslationFrom.forEach((value, index) => {
          this.getListTranslationTo(index + 1, value)
        })
    },
    choseLevel() {
      if (
        !this.choseLevel.includes(null) ||
        !this.choseLanguage.includes(null)
      ) {
        this.errorLanguage = false
      }
    },
  },
  mounted() {
    this.form.setFieldsValue(this.formData)
  },
  async created() {
    const response = await this.$api.getAttributes()
    this.attributes = response.data

    this.listJobs = response.data.jobs.childs.filter(
      (job) => job.parent_attribute_id === response.data.jobs.id
    )
    this.listJobs = [
      ...this.listJobs,
      {
        name: 'none',
        id: '',
      },
    ]

    this.translations = response.data.translations.childs.filter(
      (translation) =>
        translation.parent_attribute_id === response.data.translations.id
    )

    this.listTranslationsFrom = this.translations

    this.programmingLanguages =
      response.data.programming_languages.childs.filter(
        (programmingLanguage) =>
          programmingLanguage.parent_attribute_id ===
          response.data.programming_languages.id
      )

    this.listProgrammingLanguages = this.programmingLanguages
    this.setListLanguage()
    this.choseTranslationFrom.forEach((value, index) => {
      this.listTranslation[index] = {
        from: value,
        to: this.choseTranslationTo[index],
      }
    })
    if (this.listTranslation.length > 0)
      this.choseTranslationFrom.forEach((value, index) => {
        this.getListTranslationTo(index + 1, value)
      })

    this.isLoading = false
  },
  methods: {
    checkValidateLanguage() {
      if (
        !this.choseLevel.includes(null) ||
        !this.choseLanguage.includes(null)
      ) {
        this.errorLanguage = false
      }
    },
    checkValidateTranslation() {
      if (
        !this.choseTranslationTo.includes(null) ||
        !this.yearsTranslation.includes(null) ||
        !this.choseTranslationFrom.includes(null)
      ) {
        this.errorTranslation = false
      }
    },
    checkValidateProgramingLanguage() {
      if (
        !this.yearsProgrammingLanguages.includes(null) ||
        !this.choseProgrammingLanguages.includes(null)
      ) {
        this.errorProgramingLanguage = false
      }
    },
    handleAddLanguage() {
      this.languages[this.languageNumber] =
        this.attributes.languages.childs.filter(
          (language) =>
            language.parent_attribute_id === this.attributes.languages.id &&
            !this.choseLanguage.includes(language.name)
        )
      this.choseLanguage[this.languageNumber] = null
      this.languageNumber++
    },

    handleAddTranslation() {
      this.choseTranslationFrom[this.translationNumber] = null
      this.translationNumber++
    },
    handleAddProgrammingLanguage() {
      this.choseProgrammingLanguages[this.programmingLanguageNumber] = null
      this.programmingLanguageNumber++
    },
    setListLanguage() {
      for (let i = 0; i < this.languageNumber; i++) {
        this.languages[i] = this.attributes.languages.childs.filter(
          (language) =>
            (language.parent_attribute_id === this.attributes.languages.id &&
              !this.choseLanguage.includes(language.name)) ||
            language.name === this.choseLanguage[i]
        )
      }
    },
    deleteLanguage(languageIndex) {
      this.choseLanguage.splice(languageIndex - 1, 1)
      this.choseLevel.splice(languageIndex - 1, 1)
      this.setListLanguage()
      this.checkValidateLanguage()
      this.languageNumber--
    },
    deleteTranslation(translationIndex) {
      this.choseTranslationFrom.splice(translationIndex - 1, 1)
      this.choseTranslationTo.splice(translationIndex - 1, 1)
      this.listTranslation.splice(translationIndex - 1, 1)
      this.yearsTranslation.splice(translationIndex - 1, 1)
      this.checkValidateTranslation()
      this.translationNumber--
    },
    deleteProgrammingLanguage(programmingLanguageIndex) {
      this.choseProgrammingLanguages.splice(programmingLanguageIndex - 1, 1)
      this.yearsProgrammingLanguages.splice(programmingLanguageIndex - 1, 1)
      this.checkValidateProgramingLanguage()
      this.programmingLanguageNumber--
    },

    filterIdInArray(arr, val) {
      const element = arr.find((item) => item.name === val)
      return element.id
    },

    getListTranslationTo(translationIndex, value) {
      const idTranslation = this.filterIdInArray(
        this.listTranslationsFrom,
        value
      )
      this.listTranslationsTo[translationIndex - 1] =
        this.attributes.translations.childs.filter(
          (item) => item.parent_attribute_id === idTranslation
        )
      this.listTranslation.forEach((translation, index) => {
        const isSelectedOption =
          index !== translationIndex - 1 &&
          translation.from === value &&
          translation.to
        if (isSelectedOption) {
          const existSelectOptionId = this.listTranslationsTo[
            translationIndex - 1
          ]
            .map((translationTo) => translationTo.name)
            .indexOf(translation.to)
          this.listTranslationsTo[translationIndex - 1].splice(
            existSelectOptionId,
            1
          )
        }
      })
    },
    handleTranslationFromChange(translationIndex, valueTranslation) {
      this.choseTranslationTo[translationIndex - 1] = null
      this.yearsTranslation[translationIndex - 1] = 1
      const translationTo = this.choseTranslationTo[translationIndex - 1]
      this.listTranslation[translationIndex - 1] = {
        from: valueTranslation,
        to: translationTo,
      }

      if (this.listTranslation.length > 0)
        this.choseTranslationFrom.forEach((value, index) =>
          this.getListTranslationTo(index + 1, value)
        )
      else {
        this.getListTranslationTo(translationIndex, valueTranslation)
      }
      this.checkValidateTranslation()
    },
    handleTranslationToChange(translationIndex, value) {
      this.listTranslation[translationIndex - 1] = {
        ...this.listTranslation[translationIndex - 1],
        to: value,
      }
      this.checkValidateTranslation()
    },
    handleLanguageChange(languageIndex, value) {
      this.setListLanguage()
      let languageId = ''
      for (const language of this.languages[languageIndex - 1]) {
        if (value === language.name) {
          languageId = language.id
        }
      }

      this.levels[languageIndex - 1] = this.attributes.languages.childs.filter(
        (language) => language.parent_attribute_id === languageId
      )
      this.choseLevel[languageIndex - 1] = null
      this.checkValidateLanguage()
    },
    handleProgrammingLanguagesChange(programmingLanguageIndex) {
      this.yearsProgrammingLanguages[programmingLanguageIndex - 1] = 1
      this.checkValidateProgramingLanguage()
    },

    addLanguageToAttributes(listAttributes, checkValidate) {
      const choseLanguageIds = []
      const choseLevelToIds = []
      const languageAll = this.attributes.languages.childs.filter(
        (language) =>
          language.parent_attribute_id === this.attributes.languages.id
      )
      for (const choseLanguageIndex in this.choseLanguage) {
        for (const language of languageAll) {
          if (this.choseLanguage[choseLanguageIndex] === language.name) {
            choseLanguageIds.push(language.id)
          }
        }
      }

      for (const choseLevelIndex in this.choseLevel) {
        for (const level of this.levels[choseLevelIndex]) {
          if (this.choseLevel[choseLevelIndex] === level.name) {
            choseLevelToIds.push(level.id)
          }
        }
      }
      if (this.choseLevel.includes(null) || this.choseLanguage.includes(null)) {
        this.errorLanguage = true
        checkValidate.push(false)
      }

      for (const language in this.choseLanguage) {
        const listChilds = []
        listChilds.push(this.attributes.languages.id)
        listChilds.push(choseLanguageIds[language])
        listChilds.push(choseLevelToIds[language])
        listAttributes.push({
          attributeIds: listChilds,
          value: null,
        })
      }
    },

    addTranslationToAttributes(listAttributes, checkValidate) {
      const choseTranslationFromIds = []
      const choseTranslationToIds = []
      for (const choseTranslationFromName of this.choseTranslationFrom) {
        for (const translationFrom of this.translations) {
          if (choseTranslationFromName === translationFrom.name) {
            choseTranslationFromIds.push(translationFrom.id)
          }
        }
      }

      for (const choseTranslationToName of this.choseTranslationTo) {
        for (const translationTo of this.translations) {
          if (choseTranslationToName === translationTo.name) {
            choseTranslationToIds.push(translationTo.id)
          }
        }
      }
      if (
        this.choseTranslationTo.includes(null) ||
        this.yearsTranslation.includes(null) ||
        this.choseTranslationFrom.includes(null)
      ) {
        this.errorTranslation = true
        checkValidate.push(false)
      }

      for (const translation in choseTranslationFromIds) {
        const listChilds = []
        listChilds.push(this.attributes.translations.id)
        listChilds.push(choseTranslationFromIds[translation])
        listChilds.push(choseTranslationToIds[translation])
        listAttributes.push({
          attributeIds: listChilds,
          value: this.yearsTranslation[translation],
        })
      }
    },
    convertListTranslation() {
      const listAttributes = []
      const checkValidate = []
      for (const job in this.choseJobChilds) {
        if (this.choseJob !== '') {
          const listChilds = []
          listChilds.push(this.attributes.jobs.id)
          listChilds.push(this.choseJob)
          listChilds.push(this.choseJobChilds[job])
          listAttributes.push({
            attributeIds: listChilds,
            value: null,
          })
        }
      }

      this.addTranslationToAttributes(listAttributes, checkValidate)

      this.addLanguageToAttributes(listAttributes, checkValidate)

      const programmingLanguageIds = []
      for (const programmingLanguageName of this.choseProgrammingLanguages) {
        for (const programmingLanguage of this.programmingLanguages) {
          if (programmingLanguageName === programmingLanguage.name) {
            programmingLanguageIds.push(programmingLanguage.id)
          }
        }
      }
      if (
        this.yearsProgrammingLanguages.includes(null) ||
        this.choseProgrammingLanguages.includes(null)
      ) {
        this.errorProgramingLanguage = true
        checkValidate.push(false)
      }

      for (const programmingLanguage in programmingLanguageIds) {
        listAttributes.push({
          attributeIds: [
            this.attributes.programming_languages.id,
            programmingLanguageIds[programmingLanguage],
          ],
          value: this.yearsProgrammingLanguages[programmingLanguage],
        })
      }
      return { listAttributes, checkValidate }
    },
    handleNext() {
      const { listAttributes, checkValidate } = this.convertListTranslation()
      if (checkValidate.length === 0) {
        this.$emit('submit', this.form, listAttributes)
      }
    },
    handleEditProfile() {
      const { listAttributes, checkValidate } = this.convertListTranslation()
      const currentUser = useCurrentUserStore()
      if (checkValidate.length === 0) {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            const data = new FormData()
            for (const key in this.dataIndividual?.profile) {
              if (
                key === 'nationalities' &&
                this.dataIndividual?.profile.nationalities
              ) {
                this.dataIndividual?.profile[key].forEach((nationality) => {
                  data.append('nationalities[]', nationality)
                })
              } else if (this.dataIndividual?.profile[key]) {
                data.append(key, this.dataIndividual?.profile[key])
              }
            }
            for (const key in values) {
              if (values[key]) {
                data.append(key, values[key])
              }
            }

            try {
              data.append('attributes', JSON.stringify(listAttributes))
              await this.$api.updateInfoIndividual(currentUser.id, data)

              this.$message.success(this.$t('info.editInfoSuccess'))
            } catch (e) {
              errorMessage(e.response.data.error)
            }
          }
        })
      }
    },
  },
}
