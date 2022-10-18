async function getInitialData() {
    let response = await fetch('data.json')
    let data = await response.json()
    return data
}

async function sortData() {
    let data = await getInitialData()
    let sorted = data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })

    return sorted
}

function filterData(data, filterItems) {
    let filteredData = data
    for (const key in filterItems) {
        if (Object.hasOwnProperty.call(filterItems, key) && filterItems[key]) {
            filteredData = filteredData.filter(a => a[key] === filterItems[key])
        }
    }
    return filteredData
}

// function handlePagination(list, page, perPage) {
//     let total=Math.ceil(list.lenght/perPage)
//     let start = (page - 1) * perPage
//     return { data: list.slice(start, perPage + start) }
// }

export default async function getData(params) {
    let data = await sortData()
    let response
    if (params.filterItems) response = filterData(data, params.filterItems)
    else response = data
    // if (params.page) {
    //     return handlePagination(response, params.page, params.perPage)
    // }
    return { data: response.slice(0, 50) }
}
