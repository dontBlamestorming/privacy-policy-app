import React, { useState, useEffect, forwardRef } from 'react'

import MaterialTable from 'material-table'

import { useHistory } from 'react-router-dom'

import agreementStore from '../stores/agreementStore'

import { observer } from 'mobx-react-lite'

import API from '../api/index'
import { useTheme, useMediaQuery } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ImageSearchIcon from '@material-ui/icons/ImageSearch'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const DataTable = observer(() => {
  /* headCells를 일반 변수에 선언 후 columns에 넣는 경우 브라우저 FrezzUp */
  const [headCells, setHeadCells] = useState([
    { title: 'date', field: 'date', align: 'center' },
    { title: 'name', field: 'name', align: 'center', sorting: 'false' },
    { title: 'phone', field: 'phone', align: 'center' },
    { title: 'gender', field: 'gender', align: 'center' },
    { title: 'email', field: 'email', align: 'center' },
    { title: 'upload', field: 'upload', align: 'center' },
  ])
  const tableIcons = {
    Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ExpandMoreIcon {...props} ref={ref} style={{ color: '#30bbc3' }} />
    )),
  }
  const history = useHistory()
  const theme = useTheme()
  const matcheSM = useMediaQuery(theme.breakpoints.down('sm'))

  const genFormLists = () => {
    const data = agreementStore.formLists.map(form => ({
      id: form.id,
      date: form.created,
      name: form.name,
      phone: form.phone,
      gender: form.gender,
      email: form.email,
      upload: form.files.length ? (
        <ImageSearchIcon style={{ color: '#30bbc3' }} />
      ) : (
        <CloudUploadIcon style={{ color: '#30bbc3' }} />
      ),
    }))

    return data
  }

  const getFormDatail = (e, rowData) => {
    const detail = agreementStore.formLists[rowData['id'] - 1]

    agreementStore.setFormDetails(detail)
    history.push('/studio/agreement/detail')
  }

  useEffect(() => {
    API.get('/forms')
      .then(res => {
        agreementStore.setFormLists(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <MaterialTable
        columns={headCells}
        onRowClick={(e, rowData) => getFormDatail(e, rowData)}
        data={agreementStore.formLists ? genFormLists() : []}
        icons={tableIcons}
        style={{
          padding: '0 0',
          marginTop: matcheSM ? '0' : '4.688rem',
          boxShadow: 'none',
        }}
        options={{
          showTitle: false,
          doubleHorizontalScroll: true,
          paging: false,
          // minBodyHeight: '300px',
          maxBodyHeight: '350px',
          paginationType: 'stepped',
          searchFieldStyle: {
            borderBottom: '0.5rem solid #f1eff0',
          },
          headerStyle: {
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '111e3f',
            borderBottom: '0.5rem solid #f1eff0',
          },
          rowStyle: {
            padding: '0 0',
            borderRadius: '0.625rem',
            fontWeight: 500,
            color: '111e3f',
            margin: '3px 3px !important',
            borderBottom: '0.25rem solid #f1eff0',
          },
        }}
      />
    </>
  )
})

export default DataTable
