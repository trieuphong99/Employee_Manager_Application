import React, { useState, useEffect } from 'react';
import { Input, Pagination, PaginationItem, PaginationLink, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import classNames from 'classnames'
import _ from 'lodash'
import "react-dates/lib/css/_datepicker.css";
import { IoIosSearch } from 'react-icons/io';
import { toast } from 'react-toastify';

const PaginationCusTom = props => {
  const { totalPage, pageChange } = props;
  const [inputValue, setInputValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [arrayPage, setArrayPage] = useState([1, 2, 3, 4, 5]);
  let lessThanFive = []; // array list Page khi total_page <= 5
  if (totalPage < 5) {
    for (let i = 1; i <= totalPage; i++) {
      lessThanFive = [...lessThanFive, i]
    }
  }
  useEffect(() => {
    //ceil là làm tròn lên
    if (totalPage >= 5) {
      setArrayPage(_.map([4, 3, 2, 1, 0], n => Math.ceil(currentPage / 5) * 5 - n))
    }
    pageChange(currentPage)
    // eslint-disable-next-line
  }, [currentPage]);
  const LessThanFivePagePagination = () => {
    return (
      _.map(lessThanFive, (item, index) => (
        <PaginationItem key={index}
          onClick={() => setCurrentPage(item)}
        >
          <PaginationLink
            className={classNames('', {
              currentPage: currentPage === item,
            })}
          >
            {item}
          </PaginationLink>
        </PaginationItem>
      )))
  }
  const MoreThanFivePagePagination = () => {
    return (
      <div className='flex'>
        {
          _.map(arrayPage, (item, index) => (
            <PaginationItem key={index}
              onClick={() => setCurrentPage(item)}
            >
              <PaginationLink
                className={classNames('', {
                  currentPage: currentPage === item,
                  hideMaxPage: item > totalPage
                })}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ))
        }
      </div>
    )
  }
  const goToThisPage = () => {
    if (inputValue > 0 && inputValue <= totalPage) {
      setCurrentPage(inputValue)
      setInputValue(0)
    }
    else {
      if (inputValue < 0 || isNaN(inputValue)) {
        toast.error(':D ???')
      }
      else {
        toast.error(`chỉ có tối đa ${totalPage} trang`)
      }
    }
  }
  return (
    totalPage !== 0 && <div className='Pagination'>
      <Pagination aria-label="Page navigation example">
        <PaginationItem
          onClick={() => setCurrentPage(1)}
        >
          <PaginationLink first />
        </PaginationItem>
        <div className='flex'>
          <PaginationItem
            onClick={() => {
              if (currentPage > 1)
                setCurrentPage(currentPage - 1)
            }}
          >
            <PaginationLink previous />
          </PaginationItem>
          <PaginationItem
            id="PopoverLegacy"
            type="button"
            className={classNames('', {
              hideMaxPage: Math.ceil(currentPage / 5) * 5 + 1 !== totalPage || totalPage === 6
            })}
          >
            <PaginationLink>
              {
                <span> ... </span>
              }
            </PaginationLink>
          </PaginationItem>
          {
            totalPage < 5 ? <LessThanFivePagePagination /> : <MoreThanFivePagePagination />
          }
        </div>
        <PaginationItem
          id="PopoverLegacy"
          type="button"
          className={classNames('', {
            hideMaxPage: totalPage <= 5 || totalPage === 6 || Math.ceil(currentPage / 5) * 5 + 1 === totalPage
          })}
        >
          <PaginationLink>
            {
              Math.ceil(currentPage / 5) === Math.ceil(totalPage / 5) ? <IoIosSearch /> : <span> ... </span>
            }
          </PaginationLink>
        </PaginationItem>
        <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
          <PopoverHeader>
            <p className='text-move-page'>Move Page</p>
          </PopoverHeader>
          <PopoverBody>
            <div className='div-move-page'>
              <Input
                placeholder="Page"
                className='input-page'
                onChange={(e) => setInputValue(Number(e.target.value))}
              />
              <button type='button' className='btn btn-success'
                disabled={inputValue === 0}
                onClick={goToThisPage}
              >
                Go
              </button>
            </div>
          </PopoverBody>
        </UncontrolledPopover>
        <PaginationItem
          className={classNames('', {
            hideMaxPage: Math.ceil(currentPage / 5) === Math.ceil(totalPage / 5)
          })}
          onClick={() => setCurrentPage(totalPage)}
        >
          <PaginationLink>
            {totalPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          onClick={() => {
            if (currentPage < totalPage)
              setCurrentPage(currentPage + 1)
          }}
        >
          <PaginationLink next />
        </PaginationItem>
        <PaginationItem
          onClick={() => setCurrentPage(totalPage)}
        >
          <PaginationLink last />
        </PaginationItem>
      </Pagination>
    </div>
  )
}

export default PaginationCusTom
