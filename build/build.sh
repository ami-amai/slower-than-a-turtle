# folders
__main__="../"
__datapacks__="datapacks/"
__resourcepack__="resourcepack/"
__bin__="bin/"
__build__="build/"

# source
source ${__main__}${__build__}.build_config

# values
build_type=("datapack" "resourcepack")
build_type_folder=( "data/" "assets/")

# functions
build_datapack () {
cd ${__main__}
mkdir ${__bin__}${build_version}
cd ${__build_folder__}
zip -9 -r ${_bin_file_} $mcmeta ${__build_type_folder__}
mv ${_bin_file_} ${__main__}${__main__}${__bin__}${build_version}
}

build_resourcepack () {
cd ${__main__}
mkdir ${__bin__}${build_version}
cd ${__build_folder__}
zip -9 -r ${_bin_file_} $mcmeta ${__build_type_folder__}
mv ${_bin_file_} ${__main__}${__bin__}${build_version}
}

select_build_type () {
select type in "${build_type[0]}" "${build_type[1]}"; do
case $type in
"${build_type[0]}") __build_type_folder__=${build_type_folder[0]}; select_build_datapack_version; build_datapack;;
"${build_type[1]}") __build_type_folder__=${build_type_folder[1]}; __build_folder__=${__resourcepack__}; _bin_file_="${build_name}-$type-${build_version}.zip"; build_resourcepack;;
esac
break; done
}

select_build_datapack_version () {
select __datapack__ in "${datapack[0]}" "${datapack[1]}"; do
case ${__datapack__} in
"${datapack[0]}") __build_folder__=${__datapacks__}${__datapack__};;
"${datapack[1]}") __build_folder__=${__datapacks__}${__datapack__};;
esac
break; done
_bin_file_="${build_name}-${build_type}-${__datapack__}-${build_version}.zip"
}

select_build_type