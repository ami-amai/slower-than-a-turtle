#!/bin/sh
# Folders
bin="bin/"
build="build/"
tmp="tmp/"

# Files
mcmeta="pack.mcmeta"
# Enter to main page
cd ..

# Source
source build/.build_config || echo "source not found"

# Values
type=("datapack" "resourcepack")

# Functions
setup_release_type () {
    printf "Type of release: "; echo
    select release_type in "${release[@]}"; do
    case $release in
        "${release[0]}");;
        "${release[1]}");;
        *) release_type="${release[0]}";;
    esac
    break; done
    echo
}

get_version () {
    printf "Datapack versions: "
    dir "${type[0]}s/${version}/${release_type}"
    printf "Resourcepack versions: "
    dir "${type[1]}s/${version}/${release_type}"
}

setup_version () {
    get_version
    printf "Version of release: "
    read version

    if [ "$version" == "" ]; then
        version=$latest_version
    fi

    echo
}

setup_build_type () {
    printf "Type of build: "; echo
    select build_type in "${type[@]}"; do
    case $build_type in
        "${type[0]}") type_folder="data/"; setup_datapack_type;;
        "${type[1]}") type_folder="assets/";;
    esac
    break; done
    echo
}

get_datapack_type () {
    printf "Datapacks: "
    dir "${build_type}s/${version}/${release_type}"
}

setup_datapack_type () {
    get_datapack_type
    printf "Version of datapack: "
    read datapack_type

    if [ "$datapack_type" == "" ]; then
        datapack_type="vanilla"
    fi

    echo
}

setup_dir () {
if [ "${build_type}" == ${type[0]} ]; then
    build_file="${name}-${build_type}_${datapack_type}_${release_type}-${version}.zip"
    build_dir="${build_type}s/${version}/${release_type}/${datapack_type}/"
else
    build_file="${name}-${build_type}_${release_type}-${version}.zip"
    build_dir="${build_type}s/${version}/${release_type}/"
fi
}


setup () {

setup_version
setup_release_type
setup_build_type

setup_dir
}
build_mktmp () {
    cp -r "${build_dir}${mcmeta}" "${tmp}" || mkdir "${tmp}"
    cp -r "${build_dir}${mcmeta}" "${tmp}"
}

build_prepair_dir () {
    build_mktmp
    cp -r "${build_dir}${type_folder}" "${tmp}"
}

build_mkdir () {
    mkdir "${bin}${version}/"
    mkdir "${bin}${version}/${release_type}/"
    mv "${tmp}${build_file}" "${bin}${version}/${release_type}/"
}

build_process () {
    cd "${tmp}"
    zip -9 -r "${build_file}" "${mcmeta}" "${type_folder}"
    cd ..
    mv "${tmp}${build_file}" "${bin}${version}/${release_type}/" || build_mkdir
}

build () {
    build_prepair_dir
    build_process

    rm -r "${tmp}"
}

setup
build