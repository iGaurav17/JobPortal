import React, { useState, useEffect } from 'react';
import { Box, Card, Container, Stack, Typography, useTheme, Pagination, MenuItem, ListItemIcon, MenuList } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { jobLoadAction } from '../redux/actions/jobAction';
import Navbar from '../component/Navbar';
import Header from '../component/Header';
import CardElement from '../component/CardElement';
import Footer from '../component/Footer';
import LoadingBox from '../component/LoadingBox';
import SelectComponent from '../component/SelectComponent';
import { jobTypeLoadAction } from '../redux/actions/jobTypeAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Home = () => {
    const {jobs, setUniqueLocation, pages, loading} = useSelector(state=>state.loadJobs);
    
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { keyword, location } = useParams();

    const [page, setPage] = useState(1);
    const [cat, setCat] = React.useState('');


    //use effect for job
    useEffect(() => {
        dispatch(jobLoadAction(page, keyword,  cat, location));
    }, [page, keyword, cat, location]);


    //use effect for job type
    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, []);

    const handleChangeCategory = (e) => {
        setCat(e.target.value);
        console.log(cat)
        console.log("CDscjs")
    }

    return (
        <>
            <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
                <Navbar />
                <Header />
                <Container>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <Box sx={{ flex: 2, p: 2 }}>
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                                <Box sx={{ pb: 2 }}>
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter Jobs By Category
                                    </Typography>
                                </Box>
                                <SelectComponent  handleChangeCategory={handleChangeCategory} cat={cat} />
                            </Card>


                            {/* jobs by location */}
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                                <Box sx={{ pb: 2 }}>
                                    {/* <h4>Filter by category</h4> */}
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter job by location
                                    </Typography>
                                    <MenuList>
                                        {
                                            setUniqueLocation && setUniqueLocation.map((location, i) => (
                                                <MenuItem key={i}>
                                                    <ListItemIcon>
                                                        <LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                                                    </ListItemIcon>
                                                    <Link to={`/search/location/${location}`}>{location}</Link>
                                                </MenuItem>

                                            ))
                                        }
                                    </MenuList>

                                </Box>
                            </Card>
                        </Box>

                        
                                
                        <Box sx={{ flex: 5, p: 2 }}>
                            {
                                loading ?
                                <LoadingBox/> : 
                                jobs && jobs.length===0 ?
                                    <>
                                        <Box
                                            sx={{
                                                minHeight: '350px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <h2>No Result Found</h2>
                                        </Box>
                                    </> : 

                                jobs && jobs.map((job, i)=>(
                                    <CardElement
                                        key={i}
                                        id={job._id}
                                        jobTitle={job.title}
                                        description={job.description}
                                        category={job.jobType ? job.jobType.jobTypeName : "No Category"}
                                        location={job.location}
                                    />
                                ))
                            }
                            <Stack spacing={2} >
                                <Pagination page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Footer/>
        </>
    )
}                        

export default Home
