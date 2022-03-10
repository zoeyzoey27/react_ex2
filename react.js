const users = [
    { id: "U1", name: "Nguyễn Thành Trung", age: 22 },
    { id: "U2", name: "Hà Thị Phương Loan", age: 22 },
    { id: "U3", name: "Bùi Quỳnh Anh", age: 21 },
    { id: "U4", name: "Phạm Thị Vân Anh", age: 20 },
    { id: "U5", name: "Vũ Nhật Thái", age: 24 },
    { id: "U6", name: "Đặng Kiều Oanh", age: 23 }
];

const App = () => {
    const [text, setText] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [isSort, setIsSort] = React.useState(false);
    const [resultSort, setResultSort] = React.useState(resultSearch);
  

    const handleText = (e) => {
         setText(e.target.value);
    };
 
    const handleSearch = () => {
        setSearch(text);
        setIsSort(false);
    };

    const resultSearch = React.useMemo( 
        () =>
           users.filter((user) => {
           return user.name.toLowerCase().includes(search.toLowerCase());
        }),
        [search]
    ); 

    const handleSort = React.useCallback(
        () => {
           setIsSort(true);
           setResultSort(resultSearch.sort((a,b) => a.age-b.age));
        },
        [resultSearch],
    )

    return (
        <div className="container">
            <div className="controls">
                <div className="search-box">
                    <input type="text" id="search-input" placeholder="Nhập tên người dùng"
                     value={text} onChange={handleText} />
                     <button type="button" onClick={handleSearch} className="btn">Tìm kiếm</button> 
                </div>
                <button type="button" onClick={handleSort} className="btn btn-sort">Sắp xếp</button>
            </div>
            {isSort ? <List list={resultSort} /> : resultSearch.length == 0 ? "Không có kết quả tìm kiếm" : <List list={resultSearch}/>}
        </div>     
    );
}; 

const List = ({list}) => {
     return (
        <ul className="list-user">
            {list.map((item) => (
               <ListItem key={item.id} item={item} />    
            ))}
        </ul>
     );
};

const ListItem = ({item}) => {
    return (
        <li>Họ tên: {item.name} - Tuổi: {item.age}</li>
    )
}
ReactDOM.render(<App />, document.getElementById("root"));





