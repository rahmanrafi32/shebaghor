import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {ChangeEvent, useState, useEffect} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {useAppDispatch} from "@/redux/hooks";
import {filterOptions} from "@/redux/features/service/serviceSlice";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '30ch',
            '&:focus': {
                width: '50ch',
            },
        },
    },
}));

const CustomSearch = () => {
    const [searchInput, setSearchInput] = useState<string>();
    const dispatch = useAppDispatch();
    const handleSearchInput = ({target}: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(target.value);
    };

    useEffect(() => {
        dispatch(filterOptions({ searchTerm: searchInput }));
    }, [dispatch, searchInput]);

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search Service"
                inputProps={{'aria-label': 'search'}}
                onChange={handleSearchInput}
            />
        </Search>
    );
};

export default CustomSearch;

