import React, { useEffect, useState } from 'react'

import FileManageBox from './FileManageBox'
import adminHomeMainImg from '../../assets/studio_home.png'

import {
  Box,
  Grid,
  Container,
  makeStyles,
  Dialog,
  DialogActions,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import API from '../../api'
import { saveAs } from 'file-saver'

const AgreementDetail = ({ location }) => {
  const [formDetail, setFormDetail] = useState([])
  const [update, setUpdate] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    const id = location.state.id

    API.get(`/agreement/forms/${id}`)
      .then(res => {
        if (res.data.gender === 'male') {
          res.data.gender = '남자'
        } else if (res.data.gender === 'female') {
          res.data.gender = '여자'
        }

        setFormDetail(res.data)
      })
      .catch(error => console.log(error))
  }, [location.state.id, update])

  const uploadFile = event => {
    setDialogOpen(true)

    const data = new FormData()

    data.append('form', formDetail.id)
    data.append('file', event.target.files[0])

    API.post('/agreement/image', data, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8',
      },
    })
      .then(res => {
        if (res.status === 201) {
          setUpdate(!update)
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setDialogOpen(false)
      })
  }

  const extactFilename = id => {
    let filename
    const files = Object.values(formDetail.files)

    files.map(file => {
      if (file.id === id) {
        const text = file.file.name

        filename = text.split('_')[0].slice(4)
      }
    })

    return filename
  }

  const downloadFile = ({ id }) => {
    setDialogOpen(true)

    API.get(`/agreement/download/${id}`, { responseType: 'blob' })
      .then(res => {
        const filename = extactFilename(id)
        const image = res.data

        saveAs(image, filename)
      })
      .catch(error => {
        throw error
      })
      .finally(() => {
        setDialogOpen(false)
      })
  }

  const deleteFile = ({ id }) => {
    API.delete(`/agreement/image/${id}`)
      .then(res => {
        const leftFiles = formDetail.files.filter(file => file.id !== id)
        setFormDetail({
          ...formDetail,
          files: leftFiles,
        })
      })
      .catch(error => console.log(error))
  }

  return (
    <Container className={classes.container}>
      <Grid className={classes.mainImage} />
      <Grid className={classes.content} container>
        <Grid
          className={classes.content__fileManageField}
          container
          item
          justify="center"
          md={6}
          sm={12}
          xs={12}
        >
          <FileManageBox
            files={formDetail.files}
            uploadFile={uploadFile}
            deleteFile={deleteFile}
            downloadFile={downloadFile}
          />
        </Grid>

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
            xs={10}
          >
            <Field title="성명" text={formDetail.name} />
            <Field title="전화번호" text={formDetail.phone} />
            <Field title="성별" text={formDetail.gender} />
            <Field title="이메일" text={formDetail.email} />
            <Field title="생년월일" text={formDetail.birthday} />
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        PaperComponent={Box}
        open={dialogOpen}
        style={{ backdropFilter: 'blur(5px)' }}
      >
        <DialogActions>
          <CircularProgress className={classes.loadingProgress} />
        </DialogActions>
      </Dialog>
    </Container>
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
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 342px)',
    padding: '0 0',

    [theme.breakpoints.down('sm')]: {
      minHeight: '120vh',
    },
  },
  mainImage: {
    width: '100%',
    height: '25%',
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
    height: '70%',
    backgroundColor: '#f1eff0',

    [theme.breakpoints.down('md')]: {
      height: '75%',
    },
  },
  content__fileManageField: {
    height: '100%',

    [theme.breakpoints.down('md')]: {
      height: '50%',
    },
  },
  content__formDetailField: {
    height: '100%',

    [theme.breakpoints.down('md')]: {
      height: '50%',
    },
  },
  infoField: {
    height: '100%',
    padding: '10px 0',
  },
  field: {
    height: '16%',
    backgroundColor: '#ffffff',
    borderRadius: '1.625rem',
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
  loadingProgress: { color: '#37d5de', width: '6.25rem', height: '6.25rem' },
}))

export default AgreementDetail
