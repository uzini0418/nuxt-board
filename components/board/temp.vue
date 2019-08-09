<template>
  <perfect-scrollbar class="container ps">
    <div class="user-add-cont settingwrap">
      <div class="cont-set-head">
        <p class="head-tit">{{$t('routeMenuMapping.setup-memberRegister')}}</p>
        <div class="head-btns">
          <a-btn btnclass="round-sq primary" @click="register($event)">{{$t('button.save')}}</a-btn>
          <a-btn btnclass="round-sq txt-color" @click="routeTo('setup/users')">{{$t('button.cancel')}}</a-btn>
        </div>
      </div>
      <div class="cont-set-box">
        <article>
          <strong>ID</strong>
          <div>
            <div class="input-wrap left">
              <input v-model="formUserid" v-validate="{ rules: { required:true, regex:/^[a-z]+[a-z0-9]{3,19}$/ } }" @keyup="resetMsg('passIdMsg', 'errorIdMsg')"
                     name="userId" type="text" maxlength="20" :placeholder="$t('label.id')"
                     :useridCheck="{'input': true, 'userId_check': errors.has('userId')}" />{{ errors.first('userId') }}
              <p class="error-msg" v-show="errors.has('userId')" check="help name_check">{{ errors.first('userId') }}</p>
              <p class="error-msg blue" v-if="this.statusMsg.passIdMsg && formUserid">{{this.statusMsg.passIdMsg}}</p>
              <p class="error-msg" v-if="this.statusMsg.errorIdMsg && formUserid">{{this.statusMsg.errorIdMsg}}</p>
            </div>
            <a-btn class="right" btnclass="round-sq primary" @click="IdValidate()"><i class="icon-check mr5"></i>{{$t('button.duplicateChk')}}</a-btn>
          </div>
        </article>
        <article>
          <strong>{{$t('label.name')}}</strong>
          <div>
            <div class="input-wrap left">
              <input type="text" v-model="formName" maxlength="40"
                     v-validate="{ rules: { required:true,regex:/^[가-힣a-zA-Z\s]+$/} }"
                     name="name" class="txt big full" id="inp5" :placeholder="$t('label.name')" data-vv-validate-on="keyup"
                     :check="{'input': true, 'name_check': errors.has('name')}">
              <p class="error-msg" v-show="errors.has('name')" check="help name_check">{{ errors.first('name') }}</p>
            </div>
          </div>
        </article>
        <article>
          <strong>{{$t('label.email')}}</strong>
          <div>
            <div class="input-wrap left">
              <input maxlength="40" v-model="formEmail" name="email" :placeholder="$t('label.email')" v-validate="{ rules: { required:true,regex:/^[a-z0-9A-Z_+.-]+@([a-z0-9A-Z-]+\.)+[a-z0-9A-Z]{2,4}$/} }"
                     :check="{'input': true, 'email_check': errors.has('email')}" @keyup="resetMsg('passMail', 'errorMailMsg')">
              <p class="error-msg" v-show="errors.has('email')" check="help email_check">{{ errors.first('email') }}</p>
              <p class="error-msg" v-if="this.statusMsg.errorMailMsg && formEmail">{{this.statusMsg.errorMailMsg}}</p>
              <p class="error-msg blue" v-if="this.statusMsg.passMail && formEmail">{{this.statusMsg.passMail}}</p>
            </div>
            <a-btn class="right" btnclass="round-sq primary" @click="EmailValidate()"><i class="icon-check mr5"></i>{{$t('button.duplicateChk')}}</a-btn>
          </div>
        </article>
        <article>
          <strong>{{$t('label.profile-photo')}}</strong>
          <div>
            <div v-if="this.imgInfo" class="prof-img-wrap mb10 mt10" :style="{backgroundImage: `url('${imgDefault}')`}">
              <label>{{$t('label.change-photo')}}<input @change="drawThumnail($event)" type="file" name="attatchedPhoto" :placeholder="$t('label.image')"
                                                        accept="image/*" style="display: none;" ref="attatchedPhoto" class="btn-pic-reset" /></label>
            </div>
            <div v-else class="prof-img-wrap mb10 mt10" :style="{backgroundImage: `url('${imgURI}')`}">
              <label>{{$t('label.change-photo')}}<input @change="drawThumnail($event)" type="file" name="attatchedPhoto" :placeholder="$t('label.image')"
                                                        accept="image/*" style="display: none;" ref="attatchedPhoto" class="btn-pic-reset" /></label>
            </div>
          </div>
        </article>
        <article style="z-index:15;">
          <strong>{{$t('label.dept-id')}}</strong>
          <div>
            <select-box :items="departList" :value.sync="formDepartment" :viewName="'parentTree'" :codeName="'id'"></select-box>
          </div>
        </article>
        <article style="z-index:10;">
          <strong>{{$t('label.rank')}}</strong>
          <div>
            <select-box :items="rankList" :value.sync="formrankPosition" :viewName="'name'" :codeName="'id'"></select-box>
          </div>
        </article>
        <article style="z-index:5;">
          <strong>{{$t('label.official')}}</strong>
          <div>
            <select-box :items="officialList" :value.sync="formPostPosition" :viewName="'name'" :codeName="'id'"></select-box>
          </div>
        </article>
        <article>
          <strong>{{$t('label.phone')}}</strong>
          <div class="over-hide">
            <div class="input-wrap">
              <input name="endNum" maxlength="13" v-model="formPhone" v-on:keyup="addDashes()"
                     v-validate="{rules: { required:false,regex:/^\d{3}-\d{3,4}-\d{4}$/,min:11,max:13}}"
                     :pwCheck="{'input': true, 'endNum': errors.has('endNum')}">
            </div>
          </div>
        </article>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script>
  import {toast} from '~/utils/toast'
  import {Validator} from 'vee-validate'
  import imgDefault from '~/static/img/profile-g.jpg'
  import {stringify} from 'querystring'

  export default {
    layout: 'basic2',
    async asyncData ({app, error}) {
      try {
        let departList = await app.$axios.post(`${process.env.baseUrl}/api/departmentRepository/treeList`, app.$utils.getReqList(9999, 0, ["useYn"], ["Y"]))
        let rankOfficialList = await app.$axios.post(`${process.env.baseUrl}/api/rankOfficialRepository/list`, app.$utils.getReqList(9999, 0, ["useYn"], ["Y"]))
        let rankList = await app.$axios.post(`${process.env.baseUrl}/api/rankOfficialRepository/list`, app.$utils.getReqList(9999, 0, ["useYn", "type"], ["Y", "rank"]))
        let officialList = await app.$axios.post(`${process.env.baseUrl}/api/rankOfficialRepository/list`, app.$utils.getReqList(9999, 0, ["useYn", "type"], ["Y", "official"]))

        return {
          departList: departList.data.data.list ? departList.data.data.list : [],
          rankOfficialList: rankOfficialList.data.data.list ? rankOfficialList.data.data.list : [],
          officialList: officialList.data.data.list ? officialList.data.data.list : [],
          rankList: rankList.data.data.list ? rankList.data.data.list : [],
        }
      } catch (e) {
        error({message: 'rankOfficial not found', statusCode: 404})
      }
    },
    data () {
      return {
        imgDefault,
        baseUrl: process.env.baseUrl,
        rankOfficialList: [],
        departList: [],
        formUserid: '',
        formName: '',
        errFlag: false,
        errTxt: '',
        formEmail: '',
        formDepartment: '',
        formrankPosition: '',
        formPostPosition: '',
        formPhone: '',
        formProfile: Object,
        formRole: 'customer',
        emailFlag: false,
        isFlag: false,
        statusMsg: {
          passIdMsg: '',
          errorIdMsg: '',
          errorMailMsg: '',
          passMail: ''
        },
        imgInfo: true,
        imgURI: ''
      }
    },
    methods: {
      routeTo (key) {
        this.$router.push(`/${key}`)
      },
      addDashes () {
        let str = this.formPhone.replace(/[^0-9]/g, '');
        let tmp = ''
        if (str.length < 4) {
          return
        } else if (str.length < 7) {
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3);
          this.formPhone = tmp
          return
        } else if (str.length < 11) {
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3, 3);
          tmp += '-';
          tmp += str.substr(6);
          this.formPhone = tmp
          return
        } else {
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3, 4);
          tmp += '-';
          tmp += str.substr(7);
          this.formPhone = tmp
          return
        }
      },
      resetProfile () {
        $(".pic-wrap.profile").css('background-image', 'url()')
        this.imgInfo = true
      },
      inputClear (flag) {
        switch (flag) {
          case 'id':
            this.formUserid = ''
            this.statusMsg.passIdMsg = ''
            this.statusMsg.errorIdMsg = ''
            break
          case 'name':
            this.formName = ''
            break
          case 'mail':
            this.formEmail = '',
              this.statusMsg.errorMailMsg = '',
              this.statusMsg.passMail = ''
          case 'phone':
            this.formPhone = '',
              this.statusMsg.errorMailMsg = '',
              this.statusMsg.passMail = ''
        }
      },
      drawThumnail (e) {
        e.preventDefault();
        var reader = new FileReader()
        if (e.target.files) {
          if (e.target.files[0].size == 0) {
            toast(this, 'negative', '', this.$t('toast.file-upload-0kb-file'), this.$router, '')
            return false
          }
          reader.readAsDataURL(e.target.files[0])
          this.formProfile = e.target.files[0]
        }
        // for single file
        let _this = this
        reader.onload = function () {
          var tempImage = new Image()
          tempImage.src = reader.result
          tempImage.onload = function () {
            var canvas = document.createElement('canvas')
            var canvasContext = canvas.getContext("2d")

            canvas.width = 105
            canvas.height = 105

            var startX = 0
            var startY = 0
            var imgW = canvas.width
            var imgH = canvas.height

            if (this.height > this.width) {
              imgH = canvas.width * this.height / this.width
            }
            else if (this.height < this.width) {
              imgW = canvas.width * this.width / this.height
              startX = canvas.width / 2 - imgW / 2
            }

            canvasContext.drawImage(this, startX, startY, imgW, imgH)

            var dataURI = canvas.toDataURL("image/jpeg")
            _this.imgURI = dataURI
            //$(".pic-wrap.profile").css('background-image', 'url(' + dataURI + ')')
            _this.imgInfo = false
          }
        }
      },
      // 190411 test method 사용 안하는듯???? - robb
      // test(){
      //   let actionObj = {label: '보내기', handler: () => {
      //       this.$axios.post(`${process.env.baseUrl}/api/applicationUserRepository/sendPasswordMail`, { id: '955ca6be-4948-401e-bf61-973f723eb9c3', email: 'sshcool1@naver.com'})
      //     }}
      //   toast(this, 'positive', '사용자 추가 완료', '사용자 추가 완료 되었습니다. \n' + '님 에게\n회원가입 안내 메일을 보내시겠습니까?', this.$router, '', 10000, actionObj)
      // },
      register () {
        this.$validator.validateAll().then((result) => {
          if (result && this.statusMsg.errorIdMsg === '' && this.statusMsg.errorMailMsg === '') {
            if (!this.isFlag) {
              this.isFlag = true
              const data = new FormData()
              data.append("typeId", 'user')
              data.append("password", 'NEW')
              data.append("username", this.formUserid)
              data.append("name", this.formName)
              data.append("email", this.formEmail)
              data.append("department", this.formDepartment)
              data.append("postPosition", this.formPostPosition)
              data.append("rankPosition", this.formrankPosition)
              data.append("photo", this.formProfile)
              data.append("cellphone", this.formPhone)
              data.append("userGroupId", 'user')
              data.append("role", this.formRole)
              data.append("userStatus", "00")

              //this.$axios.post(`${process.env.baseUrl}/app/user/userSave`, data, {headers: {'Content-Type': 'multipart/form-data'}})
              var _vm = this;
              this.$axios.post(`${process.env.baseUrl}/users/sign-up`, data, {headers: {'Content-Type': 'multipart/form-data'}})
                .then((res) => {
                  if (res.status === 200) {
                    let actionObj = {
                      label: this.$t('button.send'),
                      handler: () => {
                        this.$axios.post(`${process.env.baseUrl}/api/applicationUserRepository/sendPasswordMail`, { id: res.data.data.id, email: this.formEmail})
                      }
                    }
                    toast(this, 'positive', '', this.$t('toast.member-create-complete').replace('[[NAME]]', this.formName).replace('[[DEPT]]', this.formrankPosition), this.$router, '', 10000, actionObj)
                    _vm.routeTo('setup/users')
                  }
                }).catch((res) => {
                this.isFlag = false
                this.error = true
              })
            }
          } else {
            // console.log('result???', result)
          }
        })
      },
      modifyBtn (flag, status) {
        if (status === 'modify') {
          window.onbeforeunload = function (e) {
            e = e || window.event;
            let message = this.$t('upload.upload-stop-confirm')
            // For IE<8 and Firefox prior to version 4
            if (e) {
              e.returnValue = message
            }
            return message
          }
        } else if (status === 'cancel') {
          window.onbeforeunload = null
        }

        let arr = ['modify_nm', 'modify_part', 'modify_mail', 'modify_contact']
        this.statusMsg.passMail = ''
        for (let i in arr) {
          if (arr[i] === flag) {
            eval('this.' + flag + ' = !this.' + flag)
          } else {
            eval('this.' + arr[i] + ' = false')
          }
        }
      },
      IdValidate () {
        let bodyData = {
          username: this.formUserid
        }

        if (this.formUserid != '') {
          this.$axios.post(`${process.env.baseUrl}/api/applicationUserRepository/IdValidate`, bodyData).then(response => {
            const regexp = /^[a-z]+[a-z0-9]{3,19}$/g;
            //console.log('response : ', response.status)
            let idlist = response.data.data.totCnt
            //console.log('IdValidate',this.formUserid)
            if (idlist != 0) {
              this.statusMsg.errorIdMsg = this.$t('validate.userId.used')
              this.statusMsg.passIdMsg = ''
              return false
            } else if (this.formUserid === '') {
              this.statusMsg.passIdMsg = ''
              this.statusMsg.errorIdMsg = ''
              this.statusMsg.errorIdMsg = this.$t('validate.required')
            } else if (!regexp.test(this.formUserid)) {
              this.statusMsg.errorIdMsg = this.$t('validate.userId.regex')
              this.statusMsg.passIdMsg = ''
            } else {
              this.statusMsg.passIdMsg = this.$t('validate.userId.available')
              this.statusMsg.errorIdMsg = ''
            }
          })
        }
      },
      EmailValidate () {
        let bodyData = {
          email: this.formEmail
        }
        this.$axios.post(`${process.env.baseUrl}/api/applicationUserRepository/EmailValidate`, bodyData).then(response => {
          const regexp = /^[a-z0-9A-Z_+.-]+@([a-z0-9A-Z-]+\.)+[a-z0-9A-Z]{2,4}$/
          let emaillist = response.data.data.totCnt
          if (!regexp.test(this.formEmail)) {
            this.statusMsg.errorMailMsg = this.$t('validate.email.title')
            this.statusMsg.passMail = ''
          } else if (emaillist == 1) {
            this.statusMsg.errorMailMsg = this.$t('validate.email.used')
            this.statusMsg.passMail = ''
          } else {
            this.emailFlag = true
            this.statusMsg.passMail = this.$t('validate.email.available')
            this.statusMsg.errorMailMsg = ''
          }
        })
      },
      ckeckNull (obj) {
        for (var i in obj) {
          if (obj.hasOwnProperty(i))
            return false;
        }
        return true;
      },
      // 19.08.07 ann 작성
      // input 수정 시 메세지 초기화
      resetMsg(pMsg, eMsg) {
        this.statusMsg[pMsg]= ''
        this.statusMsg[eMsg] = ''
      }
    },
    mounted: function () {
      const dictionary = {
        custom: {
          userId: {
            required: this.$t('validate.required-id'),
            regex: this.$t('validate.userId.regex')
          },
          email: {
            required: this.$t('validate.email.required'),
            email: this.$t('validate.email.regex'),
            regex: this.$t('validate.email.regex')
          },
          name: {
            required: this.$t('validate.formName.required'),
            max: this.$t('validate.formName.max'),
            regex: this.$t('validate.formName.regex')
          },
          endNum: {
            required: this.$t('validate.phone.required'),
            regex: this.$t('validate.phone.regex'),
            min: this.$t('validate.phone.min'),
            max: this.$t('validate.phone.max')
          },
        }
      }
      Validator.localize(this.$i18n.locale, dictionary);
    }
  }
</script>
