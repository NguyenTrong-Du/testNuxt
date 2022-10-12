<template>
  <a-spin :spinning="isLoading">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <div class="steps-content overflow-auto m-5 bg-slate-800">
        <a-form-item :label="$t('info.job')" class="mt-4 flex gap-8">
          <a-select v-model="choseJob" placeholder="Please select a job">
            <span slot="notFoundContent">
              <span class="flex justify-center">{{ $t('info.noData') }}</span>
            </span>
            <a-select-option v-for="job in listJobs" :key="job.id">
              {{ $t(`job.${job.name.replace(/\s/g, '')}`) }}
            </a-select-option>
          </a-select>
          <a-checkbox-group v-model="choseJobChilds" name="checkboxjob">
            <a-row>
              <a-col
                v-for="jobChild in listJobChilds"
                :key="jobChild.value"
                :span="12"
              >
                <a-checkbox :value="jobChild.value">
                  {{ $t(`job.${jobChild.label.replace(/\s/g, '')}`) }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item :label="$t('info.pr')" class="mt-4 flex gap-8">
          <a-textarea v-decorator="['self_introduction']" :rows="4" />
        </a-form-item>
      </div>

      <div class="steps-content overflow-auto m-5 bg-slate-800">
        <a-form-item :label="$t('info.language')" class="mt-4 flex gap-8">
          <div
            v-for="languageIndex in languageNumber"
            :key="languageIndex"
            class="flex"
          >
            <a-form-item
              class="mr-3"
              :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
            >
              <a-select
                v-model="choseLanguage[languageIndex - 1]"
                @change="(value) => handleLanguageChange(languageIndex, value)"
              >
                <span slot="notFoundContent">
                  <span class="flex justify-center">{{
                    $t('info.noData')
                  }}</span>
                </span>
                <a-select-option
                  v-for="language in languages[languageIndex - 1]"
                  :key="language.name"
                  :value="language.name"
                >
                  {{
                    language.name.split(' ').length >= 2
                      ? $t(`language.${language.name.split(' ')[0]}`)
                      : $t(`language.${language.name}`)
                  }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              class="ml-3"
              :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
            >
              <a-select
                v-model="choseLevel[languageIndex - 1]"
                :disabled="!choseLanguage[languageIndex - 1]"
              >
                <span slot="notFoundContent">
                  <span class="flex justify-center">{{
                    $t('info.noData')
                  }}</span>
                </span>
                <a-select-option
                  v-for="level in levels"
                  :key="level.name"
                  :value="level.name"
                >
                  {{
                    level.name.split(' ').length >= 2
                      ? $t(`level.${level.name.split(' ')[0]}`)
                      : $t(`level.${level.name}`)
                  }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-icon
              type="delete"
              class="m-2 text-[25px] text-red-600"
              @click="deleteLanguage(languageIndex)"
            />
          </div>
          <div
            class="steps-content flex justify-center items-center cursor-pointer"
            @click="handleAddLanguage()"
          >
            <MdAddIcon w="25px" h="25px" />
          </div>
        </a-form-item>
      </div>

      <div class="steps-content overflow-auto m-5 bg-slate-800">
        <a-form-item
          :label="$t('info.translation')"
          class="mt-4 mb-4 flex gap-8"
        >
          <div
            v-for="translationIndex in translationNumber"
            :key="translationIndex"
            class="flex"
          >
            <a-form-item
              class="mr-3"
              :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
            >
              <a-select
                v-model="choseTranslationFrom[translationIndex - 1]"
                @change="
                  (value) =>
                    handleTranslationFromChange(translationIndex, value)
                "
              >
                <span slot="notFoundContent">
                  <span class="flex justify-center">{{
                    $t('info.noData')
                  }}</span>
                </span>
                <a-select-option
                  v-for="translationForm in listTranslationsFrom"
                  :key="translationForm.name"
                  :value="translationForm.name"
                >
                  {{
                    translationForm.name.split(' ').length >= 2
                      ? $t(`translation.${translationForm.name.split(' ')[0]}`)
                      : $t(`translation.${translationForm.name}`)
                  }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              class="ml-3"
              :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
            >
              <a-select
                v-model="choseTranslationTo[translationIndex - 1]"
                :disabled="!choseTranslationFrom[translationIndex - 1]"
                @change="
                  (value) => handleTranslationToChange(translationIndex, value)
                "
              >
                <span slot="notFoundContent">
                  <span class="flex justify-center">{{
                    $t('info.noData')
                  }}</span>
                </span>
                <a-select-option
                  v-for="translationTo in listTranslationsTo[
                    translationIndex - 1
                  ]"
                  :key="translationTo.name"
                  :value="translationTo.name"
                >
                  {{
                    translationTo.name.split(' ').length >= 2
                      ? $t(`translation.${translationTo.name.split(' ')[0]}`)
                      : $t(`translation.${translationTo.name}`)
                  }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              class="ml-3"
              :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
            >
              <a-input-number
                id="yearsTranslation"
                v-model="yearsTranslation[translationIndex - 1]"
                :placeholder="$t('info.yearsExperience')"
                :disabled="!choseTranslationFrom[translationIndex - 1]"
                :min="1"
                style="width: 100%"
              />
            </a-form-item>

            <a-icon
              type="delete"
              class="m-2 text-[25px] text-red-600"
              @click="deleteTranslation(translationIndex)"
            />
          </div>
          <div
            class="steps-content flex justify-center items-center cursor-pointer"
            @click="handleAddTranslation()"
          >
            <MdAddIcon w="25px" h="25px" />
          </div>
        </a-form-item>

        <a-form-item
          :label="$t('info.programmingLanguages')"
          class="mb-4 flex gap-8"
        >
          <div
            v-for="programmingLanguageIndex in programmingLanguageNumber"
            :key="programmingLanguageIndex"
            class="flex"
          >
            <a-form-item
              class="mr-3"
              :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
            >
              <a-select
                v-model="
                  choseProgrammingLanguages[programmingLanguageIndex - 1]
                "
                @change="
                  (value) =>
                    handleProgrammingLanguagesChange(programmingLanguageIndex)
                "
              >
                <span slot="notFoundContent">
                  <span class="flex justify-center">{{
                    $t('info.noData')
                  }}</span>
                </span>
                <a-select-option
                  v-for="programmingLanguage in listProgrammingLanguages"
                  :key="programmingLanguage.name"
                >
                  {{ programmingLanguage.name }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              class="ml-3"
              :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
            >
              <a-input-number
                id="yearsProgrammingLanguages"
                v-model="
                  yearsProgrammingLanguages[programmingLanguageIndex - 1]
                "
                :placeholder="$t('info.yearsExperience')"
                :disabled="
                  !choseProgrammingLanguages[programmingLanguageIndex - 1]
                "
                style="width: 100%"
                :min="1"
              />
            </a-form-item>

            <a-icon
              type="delete"
              class="m-2 text-[25px] text-red-600"
              @click="deleteProgrammingLanguage(programmingLanguageIndex)"
            />
          </div>
          <div
            class="steps-content flex justify-center items-center cursor-pointer"
            @click="handleAddProgrammingLanguage()"
          >
            <MdAddIcon w="25px" h="25px" />
          </div>
        </a-form-item>
      </div>

      <div class="flex justify-center">
        <a-button type="primary" @click="handleNext()">
          {{ $t('info.save') }}
        </a-button>
        <a-button
          style="margin-left: 8px"
          @click="
            $emit(
              'prev',
              form,
              (data = {
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
              })
            )
          "
        >
          {{ $t('info.previous') }}
        </a-button>
      </div>
    </a-form>
  </a-spin>
</template>

<script src="./PersonalnfoLogic.js"></script>
<style scoped>
.steps-content {
  border: 1px dashed #e9e9e98e;
  border-radius: 6px;
  width: calc(100% - 33px);
}
.ion {
  fill: #e9e9e98e;
}
</style>
