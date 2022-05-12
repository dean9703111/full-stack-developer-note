local itemName = KEYS[1]
local n = tonumber(ARGV[1])
local orderList = ARGV[2]
local userName = ARGV[3]
if not n  or n == 0 then
   return 0
end
local vals = redis.call("HMGET", itemName, "Total", "Booked");
local total = tonumber(vals[1])
local booked = tonumber(vals[2])
if not total or not booked then
   return 0
end
if booked + n <= total then
   redis.call("HINCRBY", itemName, "Booked", n)
   redis.call("LPUSH", orderList, userName)
   return n
end
return 0