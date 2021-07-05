import React, { useRef } from 'react'

import uploadImage from '../../assets/upload_icon.png'

import { Grid, Button, makeStyles, IconButton } from '@material-ui/core'
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import GetAppIcon from '@material-ui/icons/GetApp'

const FileManageBox = ({
  files = [],
  uploadFile,
  downloadFile,
  deleteFile,
}) => {
  const fileInput = useRef(null)
  const classes = useStyles()

  return (
    <>
      <Grid container justify="center" alignItems="center">
        <Grid className={classes.uploadButtonBox} item md={4} sm={4} xs={6}>
          <Button fullWidth onClick={() => fileInput.current.click()}>
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

      <Grid className={classes.fileListBox} item md={11} sm={10} xs={10}>
        {files.map(file => (
          <Item
            file={file}
            deleteFile={deleteFile}
            downloadFile={downloadFile}
          />
        ))}
      </Grid>
    </>
  )
}

const Item = ({ file, deleteFile, downloadFile }) => {
  const classes = useStyles()
  const splitedFilename = file.file.name.split('/').pop().split('_')
  let filename

  if (splitedFilename.length === 1) {
    filename = splitedFilename[0].slice(0)
  } else {
    filename = splitedFilename.slice(0, splitedFilename.length - 1) + '.psd'
  }

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
        <IconButton onClick={() => downloadFile(file)}>
          <GetAppIcon className={classes.uploaded_icon} />
        </IconButton>
        <IconButton onClick={() => deleteFile(file)}>
          <DeleteForeverOutlinedIcon className={classes.uploaded_icon} />
        </IconButton>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  uploadButtonBox: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
  },
  uploadButton__text: {
    fontSize: '1.375rem',
    borderRadius: '0.625',
    margin: '0 0',
  },
  fileListBox: {
    overflow: 'scroll',
    overflowX: 'hidden',
    WebkitOverflowScrolling: {
      display: 'none !important',
    },
    height: '40%',
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

  // 스크롤바 global style
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
}))

export default FileManageBox
