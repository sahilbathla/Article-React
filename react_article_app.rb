require 'sinatra'
require 'sinatra/assetpack'

class ReactArticleApp < Sinatra::Base
  
  register Sinatra::AssetPack

  assets do
    serve '/js', from: 'js'
    serve '/css', from: 'css'
  end

  get '/' do
    send_file 'index.html'
  end
end