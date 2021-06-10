import React, { useState, useEffect } from 'react'

import MaterialTable from 'material-table'

import { useHistory } from 'react-router-dom'

import agreementStore from '../stores/agreementStore'

import { observer } from 'mobx-react-lite'

import userStore from '../stores/userStore'

import API from '../api/index'
import { useTheme, useMediaQuery } from '@material-ui/core'

// const headCells = [
//   { title: 'date', field: 'date', align: 'center' },
//   { title: 'name', field: 'name', align: 'center', sorting: 'false' },
//   { title: 'phone', field: 'phone', align: 'center' },
//   { title: 'gender', field: 'gender', align: 'center' },
//   { title: 'email', field: 'email', align: 'center' },
//   { title: 'upload', field: 'upload', align: 'center' },
// ]

const DataTable = observer(() => {
  const [headCells, setHeadCells] = useState([
    { title: 'date', field: 'date', align: 'center' },
    { title: 'name', field: 'name', align: 'center', sorting: 'false' },
    { title: 'phone', field: 'phone', align: 'center' },
    { title: 'gender', field: 'gender', align: 'center' },
    { title: 'email', field: 'email', align: 'center' },
    { title: 'upload', field: 'upload', align: 'center' },
  ])
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
    }))

    return data
  }

  const getFormDatail = (e, rowData) => {
    const detail = agreementStore.formLists[rowData['id'] - 1]

    agreementStore.setFormDetails(detail)
    history.push('/studio/agreement/detail')
  }

  useEffect(() => {
    // 해당 사용자의 Studio에서만 받은 Form을 Return하도록.
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
        style={{
          padding: '0 0',
          marginTop: matcheSM ? '0' : '4.688rem',
          boxShadow: 'none',
        }}
        options={{
          showTitle: false,
          paging: false,
          // minBodyHeight: '50.875rem',
          // maxBodyHeight: '50.875rem',
          paginationType: 'stepped',
          headerStyle: {
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '111e3f',
            borderBottom: '0.5rem solid #f1eff0',
          },
          // rowStyle: {
          //   padding: '0 0',
          //   borderRadius: '0.625rem',
          //   fontWeight: 500,
          //   color: '111e3f',
          //   margin: '3px 3px !important',
          //   borderBottom: '0.25rem solid #f1eff0',
          //   [theme.breakpoints.down('sm')]: {},
          // },
          searchFieldStyle: {
            maxWidth: '100%',
            borderBottom: '0.5rem solid #f1eff0',
          },
        }}
      />
    </>
  )
})

export default DataTable
