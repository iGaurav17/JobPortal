const express = require("express");
const router = express.Router();
const {createJobType, allJobsType, updateJobsType, deleteJobsType} = require('../controllers/jobsTypeController');
const {isAuthenticated, isAdmin} = require('../middleware/auth');




// /api/type/create
router.post('/type/create' , isAuthenticated, isAdmin,createJobType)
// /api/type/jobs
router.get('/type/jobs' , allJobsType)
// /api/type/update/:type_id
router.put('/type/update/:type_id' , isAuthenticated, isAdmin, updateJobsType)
// /api/type/update/:type_id
router.delete('/type/delete/:type_id' , isAuthenticated, isAdmin, deleteJobsType)



module.exports = router;
