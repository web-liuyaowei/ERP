<template>
    <div class="upload-box">
        <div class="upload-step">
            <h3 class="upload-step-title">第一步：下载模版</h3>
            <p class="upload-step-des">将要导入的数据填充到数据导入模板文件中，不可改变模板的格式</p>
            <a :href="modelUrl">点击下载导入数据模板</a>
        </div>
        <div class="upload-step">
            <h3 class="upload-step-title">第二步：选择并上传文件</h3>
            <p class="upload-step-des">选择填充好数据的模版文件，选中后文件将自动上传</p>
            <el-upload class="upload-demo" ref="upload" :action="Data.actionUrl" :headers="Data.headers" :data="Data.uploadPrams" name="device" :on-change="handleChange" :on-success="handleSuccess" :on-error="handleError" :on-remove="handleremove" :file-list="fileList" :before-upload="beforeAvatarUpload" :auto-upload="false">
                <el-button slot="trigger" type="primary">上传文件</el-button>
                <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
        </div>
        <div class="upload-step">
            <h3 class="upload-step-title">第三步：开始导入</h3>
            <p class="upload-step-des">文件上传完成后，点击下面的“开始导入”按钮开始导入</p>
        </div>
        <div class="upload-start">
            <el-button type="primary" @click="submitUpload" :disabled="disabled">开始导入</el-button>
        </div>
    </div>
</template>

<script>
// import api from 'api/request.js'
export default {
    props: ['isShowImport', 'dialogVisible', 'ClickExport', 'disabled', 'fetchData'],
    created() {
        let sessionid = sessionStorage.getItem('token')
        this.Data.headers.sessid_id = sessionid
    },
    data() {
        return {
            // upload param
            Data: {
                actionUrl: process.env.BASE_URL + 'cloudfactory/supplierdevice/excelImp',
                headers: { sessid_id: '' },
                uploadPrams: { device: '' }
            },
            importModelUrl: '',
            modelUrl: process.env.BASE_URL + 'uploads/device.xls',
            fileList: []
        }
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit()
            // this.$emit('listenUploadorder', false)
        },
        beforeAvatarUpload(file) {
            let isExcel = false
            if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
                isExcel = true
            }
            //  获取不到type时
            if (!isExcel && file.type === '') {
                if (file.name.split('.')[1] === 'xls' || file.name.split('.')[1] === 'xlsx') {
                    isExcel = true
                }
            }

            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isExcel) {
                this.$message.error('文件格式错误，请选择Excel文件!')
            }
            if (!isLt5M) {
                this.$message.error('上传文件大小大小不能超过 5MB!')
            }
            return isExcel && isLt5M
        },
        handleChange(file, fileList) {
            this.Data.uploadPrams.device = file.url
            this.$emit('update:disabled', false)
            if (fileList.length > 1) {
                this.fileList = fileList.slice(1)
            }
        },
        handleremove(file, fileList) {
            this.$emit('update:disabled', true)
            this.fileList = fileList
            document.querySelectorAll('input[name=excelorders]')[0].value = ''
        },
        handleSuccess(err, file, fileList) {
            this.fileList = []
            this.$emit('update:disabled', false)
            if (file.response.code == 200) {
                this.$emit('update:isShowImport', false)
                this.$message.success('上传成功')
                this.fetchData()
            } else {
                // this.isShowImport = false
                this.$emit('update:isShowImport', false)
                this.$emit('update:ImportErrorTip', file.response.message)
                this.$emit('update:dialogVisible', true)
            }
        },
        handleError(err, file, fileList) {
            this.$alert('上传失败，请重新上传', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
            })
        }
        // ClickExport() {
        //     this.$api.equipment.excelExp().then(res => {
        //         if (res.data.code == 200) {
        //             location.href = res.data.code
        //         }
        //     })
        // }
    }

}
</script>

<style lang="stylus" scoped>
  a
    text-decoration: none
	.upload-box
		font-size:14px
		color:#666
		.upload-tip
			color:#f7ba2a
			line-height:22px
			margin-bottom:13px
			.icon-info
				color:#f7ba2a
				margin-right:7px
		.upload-step
			margin-bottom:30px
			line-height:26px
			.upload-step-title
				font-size:16px
				color:#333333
			.upload-step-des
				font-size:14px
				color:#666
			a
				color:#20a0ff
				&:hover
                   cursor: pointer
					color:#4db3ff
			button
				margin-top:5px
		.upload-start
			text-align:right
</style>
