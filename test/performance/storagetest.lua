local uuid  = require 'uuid'
local redis = require 'redis'
local getTimeOfDay = require './lib/gettimeofday'

local red = redis.connect('127.0.0.1', 6379)

local badUrl

-- test 
-- how many we can store in a set and the speed of retrieval, 
-- how many we can store as k/v pairs and the speed of retrieval
-- how many how many in a bloom filter and the speed of retrieval

local getString = function(length) 
    local s = ''
    while #s < length do
        s = s..uuid()
    end
    -- trim the end
    return s:sub(1,length)
end

local a = getTimeOfDay()

-- pipeline 10000 at a time to speed things up a bit

local pipelineWrites = function(p)
    for i = 1, 10000 do
        badUrl = getString(90)
        
        p:set(badUrl, true)
    end
end

local pipelineWritesSet = function(p)
    for i = 1, 10000 do
        badUrl = getString(90)
        
        p:sadd('badurls', badUrl)
    end
end

local pipelineWritesHset = function(p)
    for i = 1, 10000 do
        badUrl = getString(90)
        key, badUrl = badUrl:sub(1, #badUrl-2), badUrl:sub(#badUrl-1, #badUrl)
        p:hset(key, badUrl, true)
    end
end

local pipelinedWrites = function()
    local i = 0
    while true do
        i = i + 10000
        if i % 100000 == 0 then
            print('processed: ', i, ' keys')
        end
        red:pipeline(pipelineWritesHset)
    end
end

local regularWrites = function() 
    local urls = {}
    for i = 1, 100000 do
        table.insert(urls, getString(90))
    end

    local a = getTimeOfDay()
    for i = 1, 100000 do
        red:set(urls[i], true)
        --red:sadd('badurls', urls[i])
        --key, badUrl = badUrl:sub(1, 2), badUrl:sub(3)
        --red:hset('badurls', urls[i], true)
    end
    local b = getTimeOfDay()

    print('took: ', (b-a)/1000, 'ms')

end

pipelinedWrites()
--regularWrites()



