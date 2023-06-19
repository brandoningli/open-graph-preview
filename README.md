# Open Graph Preview

Preview what users will see if this webpage is shared on Facebook. Uses the webpage's OG tags. All work is done locally, not on another server.

## Development

### Loading in your browser

#### Firefox

1. Enter `about:debugging` in the address bar.
2. Choose `This Firefox` > `Temporary Extensions` > `Load Temporary Add-on`
3. Select the `manifest.json`
4. Use the buttons on `about:debugging` to launch devtools or reload the extension with new source code (or use the button in the devtools to do so). The extension will remain loaded until you restart Firefox.

#### Chrome

1. Enter `chrome://extensions` in the address bar.
2. Toggle on Developer mode in the upper-right if it's off.
3. Choose `Load unpacked`
4. Choose the `extension` folder.
5. Use the buttons on `chrome://extensions` to reload the extension and see errors. The extension will remain loaded until you remove it.
    - Note: Chrome will complain about the `browser_specific_settings` manifest key, but you can safely ignore that warning.

### Building

#### Firefox

1. Zip up the extension: `npm run build`
    - This will create `web-ext-artifacts/*.zip` with a ZIP file for the extension with any potentially harmful files removed.
2. Sign the extension
    - Manually:
        1. Visit the [Add-on Developer Hub](https://addons.mozilla.org/en-US/developers/addons)
        2. If you're submitting for the first time, click "Submit a New Add-on" and follow the prompts. You'll likely want to choose distributing "On your own"; you can always change this for later versions.
        3. If you're submitting an update,
            1. Click on the extension to update.
            2. Go to "Manage Status and Versions"
            3. Click "Upload a New Version" and follow the prompts.
    - Via CLI: 
        1. Visit the [Add-on Developer Hub Key Manager](https://addons.mozilla.org/en-US/developers/addon/api/key/) to get API Keys
        2. Make a copy of `.env.template` and fill in the keys.
        3. `npm run sign:firefox`. This is equivalent to choosing the distributing "On your own" option in the UI.
        4. This may take a while, especially if a manual review is triggered. When this is complete, your signed XPI will be downloaded to your system or will be available to download from the [Add-on Developer Hub](https://addons.mozilla.org/en-US/developers/addons)
3. Install the `.xpi` by opening it with Firefox

#### Chrome

- Manually
    1. Visit `chrome://extensions`
    2. Turn on Developer mode in the upper-right if it's off
    3. Choose `Pack extension`
    4. Pick the `extension` folder, and if you're updating the extension, select the private key file. Leave the key file blank if you're creating a new extension.
    5. You'll receive a signed `.crx` file to distribute. Save the private key.
- Via CLI:
    1. Make a copy of `.env.template` and enter the path to your Chrome browser and the path to your private key if you have one.
    2. `npm run sign:chrome`. This is equivalent to doing it via the UI.
    3. You'll receive a signed `.crx` file to distribute. Save the private key.
- Install the `.crx` (in some Chromium browsers, but not Google Chrome and potentially not Edge)
    1. Open `chrome://extensions`
    2. Turn on Developer mode
    3. Drag and drop the `.crx` onto the page
- Install the `.crx` in Google Chrome (and Edge if the above doesn't work)
    - NOTE: Google Chrome doesn't allow installing off-store extensions anymore. These steps are the same as loading the extension from source above.
    1. Unzip the extension like any other ZIP file into its own directory.
    2. Open `chrome://extensions`
    3. Turn on Developer mode
    4. Choose `Load unpacked`
    5. Select the folder you extracted the extension into

### Submitting

#### Firefox

Follow the same steps as signing, but choose that you wish to list it on the store instead of sharing on your own. You'll need to use the Web UI for this.

#### Chrome

1. Build the ZIP file using `npm run build`.
2. Visit the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)
3. If you don't already have an account set up...
    1. Agree to the terms and pay the one-time fee if applicable.
    2. In the "Account" submenu, fill out your profile.
    3. Verify your email address
4. Click the `Add new item` button.
5. Choose the ZIP file and `Upload`.
6. Fill out the listing.
7. Click `Submit for Review` and follow the prompts.