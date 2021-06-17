import React, { useCallback, useState, useEffect, forwardRef } from 'react'

import MaterialTable from 'material-table'

import { useHistory } from 'react-router-dom'

import API from '../api/index'

import { useTheme, useMediaQuery, makeStyles } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import UploadButton from '../assets/upload_button_icon.png'
import ReloadButton from '../assets/reload_button_icon.png'

const tableIcons = {
  Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => (
    <ExpandMoreIcon {...props} ref={ref} style={{ color: '#30bbc3' }} />
  )),
}

const DataTable = () => {
  // const [tableHeadCells, setTableHeadCells] = useState([tableHeadCells])
  const theme = useTheme()
  const matcheSM = useMediaQuery(theme.breakpoints.down('sm'))
  const matcheXS = useMediaQuery(theme.breakpoints.down('xs'))
  const tableHeadCells = [
    { title: 'date', field: 'date', align: 'center' },
    { title: 'name', field: 'name', align: 'center', sorting: 'false' },
    { title: 'gender', field: 'gender', align: 'center', hidden: matcheXS },
    { title: 'phone', field: 'phone', align: 'center', hidden: matcheSM },
    { title: 'email', field: 'email', align: 'center', hidden: matcheSM },
    { title: 'upload', field: 'upload', align: 'center' },
  ]
  const [tableData, setTableData] = useState([])
  const history = useHistory()

  const getDetailForm = useCallback(
    (e, rowData) => {
      history.push({
        pathname: '/studio/agreement/detail',
        state: { id: rowData.id },
      })
    },
    [history],
  )

  useEffect(() => {
    API.get('agreement/forms')
      .then(res => {
        /* 이 컴포넌트에서 사용할 Data만 가져올 것 */
        /* server에서 file에 값이 있는지 없는지를 체크해서 보낼 것 */
        setTableData(
          res.data.map(form => ({
            id: form.id,
            date: form.created.slice(0, 10),
            name: form.name,
            phone: form.phone,
            gender: form.gender,
            email: form.email,
            // upload: form.files.length ? (
            //   <img
            //     className={classes.uploadCell}
            //     src={ReloadButton}
            //     alt="업로드 버튼"
            //   />
            // ) : (
            //   <img
            //     className={classes.uploadCell}
            //     src={UploadButton}
            //     alt="재업로드 버튼"
            //   />
            // ),
          })),
        )
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <MaterialTable
        columns={tableHeadCells}
        onRowClick={getDetailForm}
        data={tableData}
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
          minBodyHeight: '300px',
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
}

const useStyles = makeStyles(theme => ({
  uploadCell: {
    width: '100px',
    height: '24px',
  },
}))

export default DataTable
