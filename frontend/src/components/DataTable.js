import React, { useEffect } from 'react'

import MaterialTable from 'material-table'

import { useHistory } from 'react-router-dom'

import agreementStore from '../stores/agreementStore'

import { observer } from 'mobx-react-lite'

import userStore from '../stores/userStore'

import API from '../api/index'
import { makeStyles, useTheme, useMediaQuery } from '@material-ui/core'

const headCells = [
  {
    title: 'date',
    field: 'date',
    align: 'center',
  },
  { title: 'name', field: 'name', align: 'center', sorting: 'false' },
  { title: 'phone', field: 'phone', align: 'center' },
  { title: 'gender', field: 'gender', align: 'center' },
  { title: 'email', field: 'email', align: 'center' },
  // { title: 'upload', field: 'upload', align: 'center' },
]

const DataTable = observer(() => {
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
    history.push('/admin/agreement/detail')
  }

  useEffect(() => {
    API.get('/forms', {
      is_studio_manager: userStore.user.is_studio_manager,
    })
      .then(res => agreementStore.setFormLists(res.data))
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
          marginTop: matcheSM ? '0' : '9.688rem',
          boxShadow: 'none',
        }}
        options={{
          showTitle: false,
          // paging: false,
          // minBodyHeight: '50.875rem',
          // maxBodyHeight: '50.875rem',
          // minBodyHeight: '100px',
          // maxBodyHeight: '680px',
          // paginationType: 'stepped',
          headerStyle: {
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '111e3f',
            borderBottom: '0.5rem solid #f1eff0',
          },
          rowStyle: {
            padding: '0 0',
            borderRadius: '0.625rem',
            // fontSize: '1.25rem',
            fontWeight: 500,
            color: '111e3f',
            margin: '3px 3px !important',
            borderBottom: '0.25rem solid #f1eff0',
            [theme.breakpoints.down('sm')]: {
              border: '1px solid pink',
            },
          },
          searchFieldStyle: {
            maxWidth: '100%',
            borderBottom: '0.5rem solid #f1eff0',
          },
        }}
      />
    </>
  )
})

const useStyles = makeStyles(theme => ({
  table: {
    // marginTop: '9.688rem',
    [theme.breakpoints.down('sm')]: {
      // marginTop: '0',
    },
  },
}))

export default DataTable
