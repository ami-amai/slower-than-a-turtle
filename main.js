const fs = require('fs-extra');
const archiver = require('archiver');
const config = require('./config.json');
const meta = require('./js/meta');
const mobGenerator = require('./js/mob_generator');
const playerMechanicsGenerator = require('./js/player_mechanics_generator');
const resourcepackGenerator = require('./js/resourcepack_generator');

async function createZip(sourceFolder, zipFilePath) {
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    return new Promise((resolve, reject) => {
        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            resolve();
        });

        archive.on('error', function(err){
            reject(err);
        });

        archive.pipe(output);
        archive.directory(sourceFolder, false);
        archive.finalize();
    });
}

async function build() {
    const buildDir = './build';
    const tempDir = './temp';

    try {
        // Clean up previous builds
        await fs.emptyDir(buildDir);
        await fs.emptyDir(tempDir);

        // --- Clean up previous dynamic files ---
        await fs.remove('./datapack/data/generated');
        await fs.remove('./resourcepack/assets/minecraft/models/block');
        await fs.remove('./resourcepack/assets/minecraft/models/item');
        await fs.remove('./resourcepack/assets/minecraft/blockstates');

        // --- Generate dynamic files ---
        await mobGenerator.generate();
        await playerMechanicsGenerator.generate();
        await resourcepackGenerator.generate();

        // --- Datapack ---
        const datapackSource = './datapack';
        const datapackTemp = `${tempDir}/datapack`;
        await fs.copy(datapackSource, datapackTemp);

        // Generate and write pack.mcmeta
        const datapackMeta = meta.getDatapackMeta();
        await fs.writeFile(`${datapackTemp}/pack.mcmeta`, datapackMeta);

        // Create datapack zip
        const datapackZipPath = `${buildDir}/${config.datapack.name}-v${config.version}.zip`;
        await createZip(datapackTemp, datapackZipPath);
        console.log(`Datapack created at ${datapackZipPath}`);

        // --- Resourcepack ---
        const resourcepackSource = './resourcepack';
        const resourcepackTemp = `${tempDir}/resourcepack`;
        await fs.copy(resourcepackSource, resourcepackTemp);

        // Generate and write pack.mcmeta
        const resourcepackMeta = meta.getResourcepackMeta();
        await fs.writeFile(`${resourcepackTemp}/pack.mcmeta`, resourcepackMeta);

        // Create resourcepack zip
        const resourcepackZipPath = `${buildDir}/${config.resourcepack.name}-v${config.version}.zip`;
        await createZip(resourcepackTemp, resourcepackZipPath);
        console.log(`Resourcepack created at ${resourcepackZipPath}`);

    } catch (err) {
        console.error('Build failed:', err);
    } finally {
        // Clean up temp directory
        await fs.remove(tempDir);
    }
}

build();
