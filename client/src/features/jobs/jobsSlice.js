import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchJobs as fetchJobsApi, createJob as createJobApi, deleteJob as deleteJobApi, updateJob as updateJobApi, applyForJob as applyForJobApi } from '../../utils/api';

// Fetch Jobs
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchJobsApi();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch jobs');
  }
});

// Create Job
export const createJob = createAsyncThunk('jobs/createJob', async (jobData, { rejectWithValue }) => {
  try {
    const response = await createJobApi(jobData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to create job');
  }
});

// Delete Job
export const deleteJob = createAsyncThunk('jobs/deleteJob', async (jobId, { rejectWithValue }) => {
  try {
    await deleteJobApi(jobId);
    return jobId;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to delete job');
  }
});

// Update Job
export const updateJob = createAsyncThunk('jobs/updateJob', async (jobData, { rejectWithValue }) => {
  try {
    const response = await updateJobApi(jobData.id, jobData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to update job');
  }
});

// Apply for Job
export const applyForJob = createAsyncThunk('jobs/applyForJob', async (jobId, { rejectWithValue }) => {
  try {
    await applyForJobApi(jobId);
    return jobId;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to apply for job');
  }
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    appliedJobs: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(job => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(job => job._id === action.payload._id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.appliedJobs[action.payload] = true;
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;
 