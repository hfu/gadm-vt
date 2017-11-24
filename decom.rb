require 'find'
Find.find('9') {|path|
  next unless path.end_with?('pbf')
  print "mv #{path} #{path}.gz\n"
  print "gunzip #{path}.gz\n"
}
