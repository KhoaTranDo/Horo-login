import React,{useState} from "react";

function AddImage(){
    const [selectedImages, setSelectedImage] =useState([])
    
    const imageHandleChange = (e) =>{
        // console.log(e.target.files)
        if(e.target.files){
            const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
            console.log(fileArray)

            setSelectedImage((prevImages)=>prevImages.concat(fileArray))
            Array.from(e.target.files).map(
                (file)=>URL.revokeObjectURL(file)
            )
        }
    }
    const renderPhotos = (source) =>{
        return source.map((photo)=>{
            return <img src={photo} key={photo} style={{width:'200px',height:'200px'}}/>
        })
    }
    return(
        <div className='app'>
            <div className='heading'>
                React Multiple Images Preview
            </div>
            <div>
            <div class="input-group mb-3">
  <div class="custom-file">
    <input type="file" class="custom-file-input" multiple id='file' onChange={imageHandleChange} id="inputGroupFile02"></input>
    <label class="custom-file-label" for="inputGroupFile02">Choose file</label>
  </div>
  <div class="input-group-append">
    <span class="input-group-text" htmlFor='file'  id="">
        Upload
        </span>
  </div>
</div>
                <div className='label-holder'>
                    <label htmlFor='file' className='label'>
                        <i className='material-icons'>add_a_photo</i>
                    </label>
                </div>
                <div className='result'>
                    {renderPhotos(selectedImages)}
                </div>
            </div>
        </div>
    )
}
export default (AddImage);
