#!/usr/bin/env bash

ionic start myapp --type=ionic1 --no-link --no-git --cordova blank
cd myapp
cp -R -f ../etc/www/* ./www/ && mkdir -p resources && cp -f ../etc/icon.png resources/icon.png && cp -f ../etc/splash.png resources/splash.png
sed -i '$ d' config.xml && echo '<branch-config><branch-key value="'${BRANCH_KEY}'"/><uri-scheme value="'"${BRANCH_URI_SCHEME}"'"/><link-domain value="'${BRANCH_LINK}'"/><ios-team-release value="'${IOS_VALUE}'"/></branch-config>  </widget>' >> config.xml
sed -i -- 's/io.ionic.starter/'${WIDGET_ID}'/g' config.xml 
sed -i -- 's~<widget id=".*" version=".*" xmlns~<widget id="'"${WIDGET_ID}"'" version="'"${WIDGET_VER}"'" xmlns~g' config.xml
sed -i -- 's~<author email.*</author>~<author email="'${AUTHOR_EMAIL}'" >'"${AUTHOR_NAME}"'</author>~g' config.xml
sed -i -- 's~<name>MyApp</name>~<name>'"${APP_NAME}"'</name>~gI' config.xml
sed -i -- 's~<description.*</description>~<description>'"${APP_DESCRIPTION}"'</description>~g' config.xml
sed -i -- 's~var mainDomain = .*;~var mainDomain = "'${MAIN_DOMAIN}'";~g' www/js/controllers.js
sed -i -- 's~var appId = .*;~var appId = "'${APP_ID}'";~g' www/js/controllers.js
ionic login $IONIC_EMAIL $IONIC_PASSWORD
ionic cordova platform add android@"${CODROVA_ANDROID_VER}"
cordova plugin add cordova-plugin-inappbrowser@"${CORDOVA_PLUGIN_INAPPBROWSER_VER}"
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-device
ionic cordova resources
echo n | cordova plugin add branch-cordova-sdk@"${CORDOVA_PLUGIN_BRANCH_SDK_VER}" --variable BRANCH_KEY="${BRANCH_KEY}" --variable URI_SCHEME="${BRANCH_URI_SCHEME}"
cordova plugin add ${CORDOVA_ADDITIONAL_PLUGINS}
cat package.json
xmlstarlet ed -u "/widget/name" -v "${APP_NAME}" config.xml
cat config.xml
cordova build --release android
ionic cordova platform add android
cordova build --release android
keytool -genkey -v -keystore app.keystore -alias  app -keyalg RSA -keysize 2048 -validity 8000   -keypass ${KEYPASS} -storepass ${KEYPASS} -dname ${CERT_INFO}
jarsigner -storepass ${KEYPASS} -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore app.keystore  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk app && mkdir -p ../release_app/
zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ../release_app/release_app_`date +%F_%T`_${APP_ID}_${IONIC_APP_ID}_build.apk
cd ..
