import React, { useEffect, useState } from 'react'

import userStore from '../stores/userStore'
import agreementStore from '../stores/agreementStore'
import appStore from '../stores/appStore'

import { observer } from 'mobx-react-lite'

import Header from '../components/Header'
import Footer from '../components/Footer'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import { Grid, Paper, List, Button } from '@material-ui/core'
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'

import adminHomeMainImg from '../assets/admin_home_2x.png'

import API from '../api'

const AgreementDetail = observer(() => {
  const [uploadedImage, setUploadedImage] = useState([])
  const [url, setURL] = useState('')
  const form = agreementStore.formDetail
  const { name, phone, gender, email, birthday, upload } = form
  // TypeError: Cannot destructure property 'name' of 'form' as it is null.

  useEffect(() => {
    const files = agreementStore.formDetail.files

    setUploadedImage(files)
  }, [])

  const updateImageList = () => {
    const id = agreementStore.formDetail.id

    API.get(`/forms/image/${id}`)
      .then(res => {
        setUploadedImage(res.data)
        agreementStore.formDetail(res.data)
      })
      .catch(error => console.log(error))
  }

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
        if (res.status === 201) updateImageList()
      })
      .catch(error => console.log(error))
  }

  const download = ({ id }) => {
    API.get(`/forms/download/${id}`)
      .then(res => {
        console.log(res.data[0].file)
        setURL(res.data[0].file)

        // const binary = []
        // binary.push(res.data)
        // const bolbedData = new Blob(binary, { type: 'image/png' })
        // const url = URL.createObjectURL(bolbedData)
        // console.log(url)
        // downloadFileFromURL(url)
        // URL.revokeObjectURL(url)
      })
      .catch(error => {
        throw error
      })
  }

  async function downloadFileFromURL(url) {
    try {
      const link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      link.href = url
      link.download = url.split('/').pop()
      link.click()
      link.remove()
    } catch (e) {
      throw e
    }
  }

  const deleteFile = ({ id }) => {
    API.delete(`/forms/image/${id}`)
      .then(res => {
        console.log(res.statusText)
        updateImageList()
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <Header />
      <Grid container md={12} style={{ height: 'calc(100vh - 327px)' }}>
        <Grid item sm />
        <Grid container item sm={9}>
          <Paper
            style={{
              width: '100%',
              height: '10.125rem',
              backgroundImage: `url(${adminHomeMainImg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: '0 -50px',
            }}
          >
            <Grid
              container
              xs
              style={{ marginTop: '10.125rem', backgroundColor: '#f1eff0' }}
            >
              <Grid
                container
                item
                sm={6}
                style={{ height: '35.875rem' }}
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs>
                  <Paper style={{ marginTop: '3rem' }}>
                    <input
                      id="uploadBtn"
                      accept="image/psd"
                      multiple
                      type="file"
                      style={{ display: 'none' }}
                      onChange={event => uploadFile(event)}
                    />
                    <label htmlFor="uploadBtn">
                      <Button
                        component="span"
                        style={{
                          width: '336px',
                          borderRadius: '0.625',
                          backgroundColor: '#ffffff',
                          padding: '5.625rem 7rem',
                        }}
                      >
                        PSD 파일 업로드
                      </Button>
                    </label>
                  </Paper>
                </Grid>
                <Grid item xs>
                  <List>
                    {uploadedImage.map((image, index) => (
                      <ListItem
                        style={{
                          width: '36.188rem',
                          borderBottom: '0.5rem solid #f1eff0',
                          backgroundColor: '#fff',
                          borderRadius: '10px',
                        }}
                      >
                        <ListItemAvatar>
                          <a href={url} download>
                            <InsertPhotoOutlinedIcon
                              onClick={() => download(image)}
                            />
                          </a>
                        </ListItemAvatar>

                        <ListItemText />
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => deleteFile(image)}>
                            <DeleteForeverOutlinedIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Grid container item sm={6} style={{ marginTop: '2.875rem' }}>
                <Box title="성명" text={name} />
                <Box title="출생연도" text={birthday} />
                <Box title="휴대폰 번호" text={phone} />
                <Box title="성별" text={gender} />
                <Box title="이메일 주소" text={email} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item sm />
      </Grid>
      <Footer />
    </>
  )
})

const Box = ({ title, text }) => (
  <Paper
    style={{
      borderRadius: '0.625rem',
      backgroundColor: '#ffffff',
      width: '40rem',
      height: '5.688rem',
    }}
  >
    <Grid
      container
      xs
      justify="space-between"
      alignItems="center"
      style={{ height: '100%' }}
    >
      <Grid
        item
        style={{
          paddingLeft: '3.5rem',
          fontSize: '1.375rem',
          fontWeight: 600,
          color: '#111e3f',
        }}
      >
        {title}
      </Grid>
      <Grid
        item
        style={{
          paddingRight: '3.5rem',
          fontSize: '1.375rem',
          fontWeight: 600,
          color: '#111e3f',
          opacity: 0.8,
        }}
      >
        {text}
      </Grid>
    </Grid>
  </Paper>
)

export default AgreementDetail
