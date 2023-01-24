# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)






let upload = multer({
    dest: "uploads/"
})
AssetsRouter.post("/", upload.single('file'), async (req, res) => {
    let storedFiles: any = {};
    console.log("FILE")
    if (req.file) {
        let file = req.file as Express.Multer.File
        console.log("file", req.file)
        //check if file is valid
        // then move it to final destination
        // and mark it as uploaded in storedFiles array
        let errors: any = {};
        let matchRequiredExts = VALID_MIMES.find((mime) => file.mimetype.match(mime)) != undefined;
        if (!matchRequiredExts) {
            errors.mimetype = "MIME Type not supported";
        }
        if (file.size > MAX_FILE_SIZE) {
            errors.size = "FIle size too big";
        }
        if (Object.keys(errors).length > 0) {
            // this file errored. we push errors lets remove it.
            storedFiles[file.originalname] = errors;
            fs.rmSync(file.path);
        }
        else {
            //rename file,
            // move it to final directory,
            // push name to storedFile object.
            let renamed = randomFileName(file.originalname);
            //console.log("renamed", renamed)
            fs.readFile(file.path, async (err, data) => {
                const url = await uploadFile(data, renamed)
                fs.rmSync(file.path);
                return res.json(restSuccess(url));
            })
            //deletefile
        }
    }
})
14 h 33
const VALID_MIMES = [
    /^text\/.*$/,
    /^image\/.*$/,
    /^audio\/.*$/,
    /^video\/.*$/,
    /^application\/pdf/,
    /^application\/msword/,
    /^application\/vnd.*$/
]
const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE ? parseFloat(process.env.MAX_FILE_SIZE) : 1024 * 1024 * 250 // Maximum Uploadable size: 256Mbytes


export const randomFileName = (fileName: string, size?: number) => {
    const ext = path.extname(fileName)
    const name = crypto
        .randomBytes(size || 20)
        .toString('base64')
        .slice(0, size)
    return name + ext
}



AssetsRouter.post("/:directory", upload.array('content', 8), (req, res) => {
    //if (req.user && req.params.directory.includes(req.user._id)) {
    let directory = req.params.directory;
    let completeUrl = path.join("uploads", directory);
    if (!fs.existsSync(completeUrl)) {
        fs.mkdirSync(completeUrl);
    }
    let storedFiles: any = {};
    if (req.files?.length) {
        let files = req.files as Express.Multer.File[]
        // Its an array of files from a single form field
        files.forEach((file, i, arr) => {
            //check if file is valid
            // then move it to final destination
            // and mark it as uploaded in storedFiles array
            let errors: any = {};
            let matchRequiredExts = VALID_MIMES.find((mime) => file.mimetype.match(mime)) != undefined;
            if (!matchRequiredExts) {
                errors.mimetype = "MIME Type not supported";
            }
            if (file.size > MAX_FILE_SIZE) {
                errors.size = "FIle size too big";
            }
            if (Object.keys(errors).length > 0) {
                // this file errored. we push errors lets remove it.
                storedFiles[file.originalname] = errors;
                fs.rmSync(file.path);
            }
            else {
                //rename file,
                // move it to final directory,
                // push name to storedFile object.
                let renamed = randomFileName(file.originalname);
                console.log("renamed", renamed)
                storedFiles[file.originalname] = `${API_BASE_URL}/assets/${directory.replace("/", ".")}.${renamed}`;
                const newPath = path.join("uploads", directory, renamed)
                fs.renameSync(file.path, newPath);
            }
        })
        return res.json(restSuccess(storedFiles));
    }
    return res.status(401).json(restError("No file uploaded", undefined));
    /*     } else {
            return res.status(401).json(restError("Upload authorized on this directory", undefined))
        } */
})