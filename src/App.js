import './App.css';
import React, { useState, useEffect } from 'react';
import Star from './assets/star.js'
import getData from './mockData/getData.js'
console.log(JSON.parse(localStorage.getItem('favItems')));
function App() {
  const [tableData, setTableData] = useState()
  const [favItems, setFavItems] = useState(JSON.parse(localStorage.getItem('favItems')))
  const [params, setParams] = useState({ page: 1, perPage: 50 })
  const [filterItems, setFilterItems] = useState({
    name: '',
    date: '',
    field: '',
    title: ''
  })

  useEffect(() => {
    getDataFrom()
  }, [params])

  useEffect(() => {
    return localStorage.setItem('favItems', JSON.stringify(favItems))
  }, [favItems])


  async function getDataFrom() {
    let response = await getData(params)
    console.log(response);
    setTableData(response.data)
  }

  function setFilters() {
    setParams({
      ...params,
      filterItems
    })
  }

  // window.history.pushState("object or string", "Title", "/home#send-me-an-email");
  // if ('URLSearchParams' in window) {
  //   var searchParams = new URLSearchParams(window.location.search);
  //   searchParams.set("foo", "bar");
  //   window.location.search = searchParams.toString();
  // }
  function toggleFav(id) {
    favItems.includes(id) ?
      setFavItems(favItems.filter(item => item != id))
      :
      setFavItems([...favItems, id])
  }
  return (
    <div className="main">
      <div className='filter_container'>
        <div>
          <label>نام تغییر دهنده</label>
          <input value={filterItems.name} onChange={val => setFilterItems({ ...filterItems, name: val.target.value })} />
        </div>

        <div>
          <label>تاریخ</label>
          <input type='date' value={filterItems.date} onChange={val => setFilterItems({ ...filterItems, date: val.target.value })} />
        </div>

        <div>
          <label>نام آگهی</label>
          <input value={filterItems.title} onChange={val => setFilterItems({ ...filterItems, title: val.target.value })} />
        </div>

        <div>
          <label>فیلد</label>
          {/* <input value={filterItems.field} onChange={val => setFilterItems({ ...filterItems, field: val.target.value })} /> */}
          <select value={filterItems.field} onChange={val => setFilterItems({ ...filterItems, field: val.target.value })}>
            <option value="">هیچکدام</option>
            <option value="قیمت">قیمت</option>
            <option value="عنوان">عنوان</option>
          </select>
        </div>

        <div className='filter_btn'>
          <button onClick={setFilters}>اعمال فیلتر</button>
        </div>
      </div>

      <table>
        <tr>
          <th></th>
          <th>نام تغییر دهنده</th>
          <th>تاریخ</th>
          <th>نام آگهی</th>
          <th>فیلد</th>
          <th>مقدار قدیمی</th>
          <th>مقدار جدید</th>
        </tr>
        {tableData && tableData.map(row =>
          <tr>
            <td onClick={() => toggleFav(row.id)}><Star width='20' height='20' color={favItems.includes(row.id) ? 'yellow' : 'gray'} /></td>
            <td >{row.name}</td>
            <td>{row.date}</td>
            <td>{row.title}</td>
            <td>{row.field}</td>
            <td>{row.old_value}</td>
            <td>{row.new_value}</td>
          </tr>
        )}

      </table>
    </div>
  );
}

export default App;
