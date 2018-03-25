-- simple wrapper to get a more precise timer in lua
-- from https://www.cryptobells.com/openresty-time-resolution-with-ffi-a-more-accurate-approach/
local ffi = require("ffi")
ffi.cdef[[
	typedef long time_t;
 
 	typedef struct timeval {
		time_t tv_sec;
		time_t tv_usec;
	} timeval;
 
	int gettimeofday(struct timeval* t, void* tzp);
]]
 
local gettimeofday_struct = ffi.new("timeval")
local function gettimeofday()
 	ffi.C.gettimeofday(gettimeofday_struct, nil)
 	return tonumber(gettimeofday_struct.tv_sec) * 1000000 + tonumber(gettimeofday_struct.tv_usec)
end

return gettimeofday