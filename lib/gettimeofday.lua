-- simple wrapper to get a more precise timer in lua
local ffi = require("ffi")

ffi.cdef[[
  typedef long time_t;
  typedef struct timeval {
    time_t tv_sec;
    time_t tv_usec;
  } timeval;

  int gettimeofday(struct timeval* t, void* tzp);
]]

local function gettimeofday()
  local t = ffi.new("timeval")
  ffi.C.gettimeofday(t, nil)
  return tonumber(t.tv_sec)
end

return gettimeofday