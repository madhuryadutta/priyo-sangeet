# -----------------------------------------------requirements------------------------------------------------
# pip install eyed3

# -----------------------------------------------import Section------------------------------------------------

import os
import sys
import eyed3
eyed3.log.setLevel("ERROR")

# -----------------------------------------------static data section------------------------------------------------

# Get the list of all files and directories
path = "./public/song"
dir_list = os.listdir(path)
dir_list.sort()
# prints all files
# print(dir_list)
final_data=''
dynamic_data=''

if len(dir_list)>=1 :
    for i in dir_list :
        url_construct="./music/"+i
        audio=eyed3.load(url_construct)
        if audio.tag is not None:
            final_title=(audio.tag.title or 'NA').replace('"', '').replace('?', '').replace('#', '')
            final_artist=(audio.tag.artist or 'NA').replace('/', ',').replace('?', '').replace('#', '')
            final_album=audio.tag.album
            image_name=''.join(letter for letter in final_title if letter.isalnum()or letter in ".")
            final_image_name= "./img/"+image_name+".jpg"
            image_name_with_extension =image_name+".jpg"
            for image in audio.tag.images:
                image_file = open(final_image_name.format(final_title), "wb")
                image_file.write(image.image_data)
                image_file.close()
        else:
            final_title = i.replace('"', "")
            final_artist = i.replace("/", ",")
            final_album = i
            image_name_with_extension = ""

            # for fetcing data from server
        dynamic_data=dynamic_data+ '''{
                            songSrc:"'''+ '''./music/'''+ i +'''",
                            title: "''' + final_title+'''",
                            artist: "'''+final_artist+'''",
                            imgSrc: "'''+'''./img/'''+image_name_with_extension+'''",
                        },'''

    final_data = (
        """const songs = ["""
        + dynamic_data
        + """];

export default songs;"""
    )

    # -----------------------------------------------generate script js file------------------------------------------------

    js_file = open("src/songs.js", "w")
    js_file.write(final_data)
    js_file.close()
