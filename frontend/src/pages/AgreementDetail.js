import React, { useEffect, useRef, useState } from 'react'

import userStore from '../stores/userStore'
import agreementStore from '../stores/agreementStore'

import { observer } from 'mobx-react-lite'

import IconButton from '@material-ui/core/IconButton'
import { Grid, Button, Container, makeStyles } from '@material-ui/core'

import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import GetAppIcon from '@material-ui/icons/GetApp'

import adminHomeMainImg from '../assets/admin_home_2x.png'
import uploadImage from '../assets/upload_icon.png'

import API from '../api'

const AgreementDetail = observer(() => {
  const [files, setFiles] = useState([])
  const classes = useStyles()
  const form = agreementStore.formDetail
  const { name, phone, gender, email, birthday } = form

  useEffect(() => {
    const files = agreementStore.formDetail.files

    setFiles(files)
  }, [])

  const uploadFile = event => {
    const data = new FormData()

    data.append('is_studio_manager', userStore.user.is_studio_manager)
    data.append('form', agreementStore.formDetail.id)
    data.append('file', event.target.files[0])

    API.post('/forms/image', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        if (res.status === 201) {
          const uploadedFile = res.data
          setFiles([...files, uploadedFile])
        }
      })
      .catch(error => console.log(error))
  }

  const downloadFile = ({ id }) => {
    API.get(`/forms/download/${id}`)
      .then(res => {
        const url = res.data[0].file

        const link = document.createElementNS(
          'http://www.w3.org/1999/xhtml',
          'a',
        )
        link.href = url
        link.download = url.split('/').pop()
        link.click()
        link.remove()
      })
      .catch(error => {
        throw error
      })
  }

  const deleteFile = ({ id }) => {
    API.delete(`/forms/image/${id}`)
      .then(res => {
        const updatedFiles = files.filter(file => file.id !== id)
        setFiles(updatedFiles)
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <Container className={classes.container}>
        <Grid className={classes.mainImage} />
        <Grid className={classes.content} container>
          {/* File Manage Field */}
          <Grid
            className={classes.content__fileManageField}
            container
            item
            justify="center"
            md={6}
            sm={12}
            xs={12}
          >
            <FileManageField
              files={files}
              uploadFile={uploadFile}
              deleteFile={deleteFile}
              downloadFile={downloadFile}
            />
          </Grid>

          {/* Form Detail */}
          <Grid
            className={classes.content__formDetailField}
            container
            justify="center"
            item
            md={6}
            sm={12}
            xs={12}
          >
            <Grid
              className={classes.infoField}
              container
              alignItems="center"
              md={11}
              sm={10}
              xs={11}
            >
              <Field title="성명" text={name} />
              <Field title="전화번호" text={phone} />
              <Field title="성별" text={gender} />
              <Field title="이메일" text={email} />
              <Field title="생년월일" text={birthday} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
})

const FileManageField = ({ files, uploadFile, deleteFile, downloadFile }) => {
  const fileInput = useRef(null)
  const classes = useStyles()

  return (
    <>
      {/* Upload Field */}
      <Grid container justify="center" alignItems="center">
        <Grid className={classes.uploadButton} md={4} sm={4} xs={6} item>
          <Button
            style={{ height: '100%' }}
            fullWidth
            onClick={() => fileInput.current.click()}
          >
            <Grid container>
              <Grid item md={12} sm={12} xs={12}>
                <img src={uploadImage} alt="업로드 아이콘" />
              </Grid>
              <Grid
                className={classes.uploadButton__text}
                item
                md={12}
                sm={12}
                xs={12}
              >
                PSD 파일 업로드
              </Grid>
            </Grid>
          </Button>

          <input
            id="upload"
            accept="image/psd"
            multiple
            type="file"
            style={{ display: 'none' }}
            onChange={event => uploadFile(event)}
            ref={fileInput}
          />
        </Grid>
      </Grid>

      {/* File List Field */}
      <Grid item md={11} sm={10} xs={10}>
        {files.map(image => (
          <Item
            image={image}
            deleteFile={deleteFile}
            downloadFile={downloadFile}
          />
        ))}
      </Grid>
    </>
  )
}

const Item = ({ image, deleteFile, downloadFile }) => {
  const classes = useStyles()
  const filename = image.file.split('/').pop()

  return (
    <Grid
      className={classes.uploadedList}
      container
      md={12}
      sm={12}
      justify="space-between"
    >
      <Grid item style={{ marginLeft: '30px' }}>
        <IconButton>
          <InsertPhotoOutlinedIcon className={classes.uploaded_icon} />
        </IconButton>
        <span>{filename}</span>
      </Grid>
      <Grid item style={{ marginRight: '30px' }}>
        <IconButton onClick={() => downloadFile(image)}>
          <GetAppIcon className={classes.uploaded_icon} />
        </IconButton>
        <IconButton onClick={() => deleteFile(image)}>
          <DeleteForeverOutlinedIcon className={classes.uploaded_icon} />
        </IconButton>
      </Grid>
    </Grid>
  )
}

const Field = ({ title, text }) => {
  const classes = useStyles()

  return (
    <Grid
      className={classes.field}
      container
      item
      justify="space-between"
      alignItems="center"
      md={12}
      sm={12}
    >
      <Grid item>
        <span className={classes.field_title}>{title}</span>
      </Grid>
      <Grid item>
        <span className={classes.field_text}>{text}</span>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100vh - 285px)',

    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh)',
      padding: '0 0',
    },
  },
  mainImage: {
    maxWidth: '100%',
    height: '20%',
    backgroundImage: `url(${adminHomeMainImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',

    [theme.breakpoints.down('sm')]: {
      padding: '0 0',
      height: '200px',
    },
  },
  content: {
    height: '80%',
    backgroundColor: '#f1eff0',
  },
  uploadFieldWrapper: {
    height: '40%',

    [theme.breakpoints.down('sm')]: {},
  },
  uploadButton: {
    height: '200px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
  },
  uploadButton__text: {
    fontSize: '1.375rem',
    borderRadius: '0.625',
    margin: '0 0',
  },

  uploadedList: {
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    marginBottom: '10px',
  },
  uploaded_icon: {
    color: '#30bbc3',
    fontSize: '2rem',
  },
  infoField: {
    height: '100%',
    padding: '10px 0',
  },
  field: {
    height: '16%',
    backgroundColor: '#ffffff',
    borderRadius: '1.625rem',

    [theme.breakpoints.down('sm')]: {},
  },
  field_title: {
    paddingLeft: '3.5rem',
    fontSize: '1.375rem',
    fontWeight: 600,
    color: '#111e3f',

    [theme.breakpoints.down('sm')]: {
      paddingLeft: '1.5rem',
    },
  },
  field_text: {
    paddingRight: '3.5rem',
    fontSize: '1.375rem',
    fontWeight: 600,
    color: '#111e3f',
    opacity: 0.8,
    [theme.breakpoints.down('sm')]: {
      paddingRight: '1.5rem',
    },
  },
}))

export default AgreementDetail
