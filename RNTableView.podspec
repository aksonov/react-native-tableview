Pod::Spec.new do |s|

  s.name         = "RNTableView"
  s.version      = "1.4.6"
  s.homepage     = "https://github.com/aksonov/react-native-tableview"
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/aksonov/react-native-tableview.git" }
  s.source_files = 'RNTableView/*.{h,m}'
  s.preserve_paths = "**/*.js"
  s.dependency 'React'

end
