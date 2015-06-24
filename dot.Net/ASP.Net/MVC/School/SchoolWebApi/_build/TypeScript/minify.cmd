cd /d %~dp0
rm "%~1.map"
uglifyjs "%~1" -o "%~1" --mangle sort=true,toplevel=true,eval=true --compress dead_code=true,unused=true,sequences=true,properties=true,conditionals=true,comparisons=true,evaluate=true,booleans=true,loops=true,hoist_funs=true,hoist_vars=true,if_return=true,join_vars=true,cascade=true,warnings=false,negate_iife=true,pure_getters=true,drop_console=true --unsafe --fromString --enclose --beautify
