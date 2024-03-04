import {Box , styled} from '@mui/material'
import React from 'react'
import headerImage from '../images/jobbg.jpg';
import { theme } from '../theme';
import SearchInputEl from './SearchInputEl';

const Header = () =>{
    const StyleHeader =styled(Box)({
        display:"flex",
        justifyContent:'center',
        alignItems: 'center',
        backgroundImage:`url(${headerImage})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundColor: theme.palette.secondary.main,
        minHeight: 400
    })
    return(

        <>
            <StyleHeader>
                <SearchInputEl/>
            </StyleHeader>
        </> 
    )
}

export default Header