import { Input } from 'antd';
import React from "react";


const SearchComponent = ({ onSearchHandler, loading }: any) => {
    const { Search } = Input;
    return (
        <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearchHandler}
            loading={loading}
        />
    )
}

export default SearchComponent
