require "json"
package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNTableView"
  s.version      = package["version"]
  s.authors      = "Pavel Aksonov"
  s.summary      = package["description"]
  s.license      = package["license"]
  s.homepage     = package["homepage"]
  s.platform     = :ios, "7.0"
  s.source       = { :git => package["repository"]["url"] }
  s.source_files = 'RNTableView/*.{h,m}'
  s.preserve_paths = "**/*.js"
  s.dependency 'React'

end
