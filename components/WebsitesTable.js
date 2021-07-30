import React, { useEffect, useRef, useState } from "react"
import useSWR from "swr"
import { classNames, fetcher, getTableParams } from "../lib/util"
import tableStyles from "../styles/table.module.css"
import { AddWebsiteDialog } from "./AddWebsiteDialog"
import Image from "next/image"
import { Table } from "react-virtualized"
import { ROWS_PER_PAGE, WEBSITE } from "../util/variables"
import { TableLoader } from "./TableLoader"

export function WebsitesTable ({ pageIndex, applyFilters, categories }) {
  let tableParams;
  const [ tableContainer, setTableContainer ] = useState('')
  const [ afterAddSuccess, setAfterAddSuccess ] = useState(false)
  let loading = true

  useEffect(() => {
    const container = document.getElementById("tableContainer")
    setTableContainer(container)
  })

    tableParams = (tableContainer && !tableParams) && getTableParams(tableContainer)
    const fetcher = (...args) => fetch(...args).then(res => res.json()) 

    const getWebsitesURL = `/api/websites?page=${Number(pageIndex)}&categories=${categories}`
    // const shouldFetchWebsites = tableParams && applyFilters
    const shouldFetchWebsites = tableParams
    const { data, error, mutate } = useSWR(shouldFetchWebsites ? getWebsitesURL : null, fetcher)

    if (error) return <div>An error has occured</div>
    loading = data && false
    if (loading) return <TableLoader/>

    const rowGetter = ({index}) => { 
      if(!data) return {}
      const rowData = data.websites.filter(website => {
        return website.rowIndex === index
      })
      return rowData
    }

    const onWebsiteClick = (websiteUrl) => {
      window.open(websiteUrl, '_blank')
    }

    const rowRenderer = (props) => {
      if (!Object.keys(props.rowData).length) return false

      loading = true
      return <div key={props.index} className={tableStyles.row}>
        {props.rowData.map((cell, index) => {
          const cellClasses = classNames({
            [tableStyles.cell]: true,
            [tableStyles.firstCellInRow]: !cell.columnIndex
          })
          cell.page = pageIndex
          if (props.rowData.length === index) {
            loading = false
          }
          
          return cell.isEmpty ? <AddWebsiteDialog 
           tableParams={tableParams}
           website={cell} key={index}
           afterAddSuccess={mutate}
           />
          : 
          <div
           key={`r${cell.rowIndex}-c${cell.columnIndex}`}
           id={`r${cell.rowIndex}-c${cell.columnIndex}`} 
           className={cellClasses}
           onClick={() => onWebsiteClick(cell.url)}
           >
            <Image
              src={cell.thumbnail.url || WEBSITE.THUMBNAIL.DEFAULT}
              className={tableStyles.websiteImage}
              layout="fill"
              alt='No image found'
            />
            <span             
              id={tableStyles.websiteTitle}
              style={{
                opacity: cell.titleOpacity < 10 ? `0.${cell.titleOpacity}` : 1,
                color: cell.titleColor,
                background: cell.titleBackgroundColor,              
                top: `${cell.titlePosition}%`,
                height: `${cell.titleHeight / 4}px`
              }} 
            >
            {cell.title ? cell.title : null}</span>

              <span                    
              id={tableStyles.websiteDescription}
              style={{          
                opacity: cell.descriptionOpacity < 10 ? `0.${cell.descriptionOpacity}` : 1,
                color: cell.descriptionColor,
                background: cell.descriptionBackgroundColor,
                top: cell.descriptionPosition + "%",
                height: `${cell.descriptionHeight / 4}px`
              }}
            >
              {cell.description ? cell.description : null}</span>
          </div>
          
        })}
       </div>
    }
  
    return  <div>
        {tableParams && <Table
            width={tableParams.tableWidth}
            height={tableParams.tableHeight}
            headerHeight={0}            
            rowHeight={tableParams.rowHeight}
            rowGetter={rowGetter}
            rowRenderer={rowRenderer}
            rowCount={ROWS_PER_PAGE}
            className={tableStyles.table}
            disableHeader={true}
          >
          </Table>}
      </div>
}