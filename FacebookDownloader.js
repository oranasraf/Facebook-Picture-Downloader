function DownloadMyPhotos(){
    window.FacebookDownloader = {
        i : 0,
        img: ""
    }

    OpenCurrentLI();
}

function OpenCurrentLI(){
    console.log("li of image: " + window.FacebookDownloader.i.toString());
    $('a.uiMediaThumb ')[window.FacebookDownloader.i].click();
    CheckIfTheaterMode();
}

function CheckIfTheaterMode() {
    if (location.search.indexOf('&theater') == -1) {
        setTimeout(CheckIfTheaterMode, 100);
    } else {
        if ($('img.spotlight').attr('aria-busy') != "false" ){
            setTimeout(CheckIfTheaterMode, 100);
        } else {
            if (window.FacebookDownloader.img == $('img.spotlight').attr('src')) {
                setTimeout(CheckIfTheaterMode, 100);
            } else {
                window.FacebookDownloader.img = $('img.spotlight').attr('src');
                GetImageBlob();
            }
        }
    }
}

function GetImageBlob(){
    jQuery.ajax({
            url: window.FacebookDownloader.img,
            xhrFields:{
                responseType: 'blob'
            },
            success: function(data){
                downloadFile(data);
            }
    });
}

function downloadFile(data) {
    // Create an invisible A element
    var a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
  
    // Set the HREF to a Blob representation of the data to be downloaded
    a.href = window.URL.createObjectURL(
      new Blob([data])
    );
  
    // Use download attribute to set set desired file name
    var strName = window.FacebookDownloader.img.split('?')[0];
    strName = strName.substring(strName.lastIndexOf('/') + 1);
    a.setAttribute("download", strName);
  
    // Trigger the download by simulating click
    a.click();
  
    // Cleanup
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);

    // Close
    $('#photos_snowlift').find('a[wotdonut="true"]')[0].click();
    GoToNext();
  }

  function GoToNext(){
      window.FacebookDownloader.i++;
      OpenCurrentLI();
  }


DownloadMyPhotos();