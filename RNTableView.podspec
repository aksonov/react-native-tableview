Pod::Spec.new do |s|

  s.name         = "RNTableView"
  s.version      = "2.2.0"
  s.authors      = "Pavel Aksonov"
  s.summary      = "Native iOS UITableView for React Native with JSON support and more"
  s.license      = "BSD 2-Clause"
  s.homepage     = "https://github.com/aksonov/react-native-tableview"
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/aksonov/react-native-tableview.git",
                     :tag => "2.2.0" }
  s.source_files = 'RNTableView/*.{h,m}'
  s.preserve_paths = "**/*.js"
  s.dependency 'React'

end
