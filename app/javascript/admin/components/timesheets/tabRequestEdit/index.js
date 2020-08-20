import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Time from '../../../../commons/const/Time';
import { getListRequestEdit, setIsAllowedEdit } from '../../../actions/timeSheet';
import { Table, Badge } from 'reactstrap';
import SortTarget from '../../../../commons/components/sortTarget';
import Pagination from '../../../../commons/components/pagination/index';
import ConfirmModal from '../../../../commons/components/modal/confirmModal';
import DateRangePicker from "../../dateRangePicker";
import SearchUser from "../../../../commons/components/searchUser/searchUser";
import CustomPicker from '../../../../commons/components/dateRangePicker/customPicker';
import { pickDate } from '../../../actions/dateRange'

const TabRequestEdit = (props) => {
  // const {listRequest, sortType, sortField, letSort, setCurrentPage} = props;
  const reduxStartDate = useSelector(state => state.dateRange.startDate.format(Time.crossDMY))
  const reduxEndDate = useSelector(state => state.dateRange.endDate.format(Time.crossDMY))
  const [idStaff, setIDStaff] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("DESC");
  const [sortField, setSortField] = useState("date");
  const dispatch = useDispatch();
  const [id, setID] = useState(null);
  const letSort = field => {
    setSortType(sortType === "ASC" ? "DESC" : "ASC");
    setSortField(field);
  }
  const handleClick = (item) => {
    dispatch(setIsAllowedEdit(id, item));
  }
  useEffect(() => {
    dispatch(getListRequestEdit(reduxStartDate, reduxEndDate, currentPage, idStaff, sortType, sortField))
  }, [reduxStartDate, reduxEndDate, currentPage, idStaff, sortType, sortField])
  const listRequest = useSelector(state => state.timeSheet.listRequest);
  return(
    <div className="tables-saffs-wrapper" >
      <div className="saffs-search">
        <div style={{ display: "flex" }}>
          <div className="times-select">
            <DateRangePicker
              blockRange="none"
            />
          </div>
          <div>
            <SearchUser onSelectStaff={d => setIDStaff(d)} />
          </div>
        </div>
        <div>
          <CustomPicker pickDate={pickDate} />
        </div>
      </div>
      <div>
      <Table hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <SortTarget type="date" value="Date" sortType={sortType} sortField={sortField} letSort={letSort}  />
            <th>Checkin</th>
            <th>Checkout</th>
            <th className="reason">Reason</th>
            <SortTarget type="confirmation_status" value="Confirm" sortType={sortType} sortField={sortField} letSort={letSort} />
          </tr>
        </thead>
        <tbody>
          {
            listRequest.data === undefined || listRequest.data.length === 0 ?
            <tr>
              <td colSpan={7}><p style={{ color: 'red', fontSize: '80%' }}>No data to display</p></td>
            </tr>
            :
            _.map(listRequest.data, (item, i) => {
              return(
                <tr key={i++}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
                  <td>{item.start_at}</td>
                  <td>{item.end_at}</td>
                  <td className="reason">{item.reason}</td>
                  <td onClick={() => setID(item.id)}>
                    {item.confirmation_status === "Waiting" ?
                      <ConfirmModal item={listRequest.data} confirm={() => handleClick("confirmed")} refuse={() => handleClick("rejected")} />
                      :
                      (
                        item.confirmation_status === "Confirmed" ?
                        <Badge href="#" color="success" >Confirmed</Badge>
                        :
                        <Badge href="#" color="danger" >Rejected</Badge>
                      )
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
      {
        listRequest.data !== undefined &&
        <div>
          <Pagination totalPage={listRequest.total_page} pageChange={e => setCurrentPage(e)} />
        </div>
      }
    </div>
  );
}
export default TabRequestEdit;