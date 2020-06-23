const daysContainer = document.querySelector('.flatPicker__daysContainer')
const next_month    = document.querySelector('.flatPicker__next_month')
const prev_month    = document.querySelector('.flatPicker__prev_month')
const monthDropdown = document.querySelector('.flatpickr__monthDropdown')
const yearInput     = document.querySelector('.numInput')

const monthNames    = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const {log}         = console
let currentMonth    = new Date().getMonth() 
let currentDay      = new Date().getDate() 
let currentYear     =  2020
let selectedDate    = ''
const currentMonthFixed    = new Date().getMonth() 
let prevMotnhDaysCount     = 0
let currrentMotnhDaysCount = 0

//lower level functions
const createDay         = (day,month,OptionalClass)=> {
    const date=monthNames[month] +' '+ day + ','+currentYear
    if(selectedDate === date)
    log({selectedDate,date})
    return `<span class="flatPicker__day  ${OptionalClass +' '+( selectedDate === date?'selected':'') } " area_labe="${date}">${day}</span>`
}
const appendDays        =(days)=> days.forEach(day => {daysContainer.innerHTML += day})
const isLeapYear        = ()=>(currentYear % 100 === 0) ? (currentYear % 400 === 0) : (currentYear % 4 === 0)
const monthNumberOfDays = ()=>{
    if (currentMonth == 0 || currentMonth == 2 || currentMonth == 4 || currentMonth == 6 || currentMonth == 7 || currentMonth == 9 || currentMonth == 11)
       return 31
    if (currentMonth == 1)
       return isLeapYear() ? 29 : 28
    return 30
}

//get the days
 const currrentMotnhDays = ()=>{
    let days = []
    currrentMotnhDaysCount = monthNumberOfDays()
    for (let index = 0; index < currrentMotnhDaysCount ; index++) {
        const day = createDay(index +1,currentMonth,(currentDay==index+1 && currentMonthFixed == currentMonth)?'today':'')
        days.push(day)
    }
    return days
 }  
 const prevMotnhDays     = ()=>{
    let days = []
    let prev_month_lenght = parseInt(new Date(currentYear, currentMonth, 0).getDate());
    const day_of_week_where_currentMonth_starts = parseInt(new Date(currentYear, currentMonth, 1).getDay());
    prevMotnhDaysCount =  day_of_week_where_currentMonth_starts 
    for (let index = prev_month_lenght - day_of_week_where_currentMonth_starts ; index < prev_month_lenght ; index++) {
      const day = createDay(index+1,currentMonth-1,'prev_next_Day')
      days.push(day)
    } 
    return days
 }  
 const nextMotnhDays     = ()=>{
    //42 is the total number of cells in a calender , so this means if we have figured the left 
    //overs of the previous month and added that to the current month's lenght  and then substracted 
    //the sum from 42 we'd get the next months left overs
    const next_Month_left_over_days = 42-(currrentMotnhDaysCount + prevMotnhDaysCount)
    let   days = []
    for (let index = 0; index < next_Month_left_over_days ; index++) {
      const day = createDay(index + 1,currentMonth+1,'prev_next_Day')
      days.push(day)
    } 
    return days
 } 

//append the days 
 const renderCalender=()=>{
    daysContainer.innerHTML = '';
    const currentMonthDays = currrentMotnhDays()
    const prevMonthDays    = prevMotnhDays()
    const nextMonthDays    = nextMotnhDays()
    appendDays(prevMonthDays)
    appendDays(currentMonthDays)
    appendDays(nextMonthDays)
 }
 
 

// event listners and their handlers 
const toNextMonth=e=>{
    currentMonth++;
    if(currentMonth>11)currentMonth=0
    renderCalender()
}
const toPrevMonth=e=>{
    currentMonth--;
    if(currentMonth<0)currentMonth=11
    renderCalender()
}
const toSelectedYear=e=>{
     currentYear =parseInt( e.target.value)
     //check if year is bigger than 1901 wich is apprently the standard base date for all calenders 
     if(currentYear>1900)  renderCalender()
}
const toSelectedMonth=e=>{
    currentMonth = e.target.value
    renderCalender()

}
const pickDate=e=>{
    if(e.target.classList.contains('flatPicker__day') )
    {
        selectedDate =e.target.getAttribute('area_labe')
        e.target.classList.add('selected')
    } 
        
}
monthDropdown.addEventListener('change',toSelectedMonth)
yearInput.addEventListener('input',toSelectedYear)
next_month.addEventListener('click',toNextMonth)
prev_month.addEventListener('click',toPrevMonth)
daysContainer.addEventListener('click',pickDate)

renderCalender()