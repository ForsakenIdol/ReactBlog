import React from 'react';

class BlogAbout extends React.Component {

    render() {
        let hrclass = "";
        return (
            <div className="blog-about">
                <h1>About</h1>
                <hr className={hrclass} style={{marginBottom: "4rem", height: "0.15rem", width: "3%"}} color="#555" />
                <p style={{fontSize: "1.5rem"}} >
                    "Reviews are the most powerful part of any project, and provide the most information."
                </p>
                <hr className={hrclass} style={{marginTop: "4rem", marginBottom: "3rem", height: "0.1rem", width: "3%"}} color="#555" />
                <div className="container description" style={{textAlign: "center"}} >
                    <div className="col-5" style={{textAlign: "left"}}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat ullamcorper mauris, id sagittis felis facilisis a. Nunc pellentesque nisl et ex vulputate finibus. Nunc semper lacus sit amet ligula pellentesque, viverra lacinia urna vestibulum. Duis a augue risus. Quisque tristique turpis quis blandit commodo. Nunc gravida pharetra orci, a hendrerit sapien commodo id. Pellentesque purus dui, mattis vel velit in, tempor tempor urna. Vestibulum posuere augue et tincidunt cursus. Praesent at diam ex. Vestibulum id arcu felis. Nam elementum eu est eget cursus. Aliquam nisl dolor, placerat nec enim vitae, facilisis iaculis elit.</p>
                        <p>Aliquam tristique ornare nibh, in dapibus mi. Vestibulum vitae sem dapibus, mattis ante vel, fermentum sapien. Suspendisse ac convallis diam, sed porttitor metus. Donec quam neque, placerat pharetra mauris ac, consectetur vestibulum ligula. In id sem tortor. Proin nec aliquet metus. Fusce vehicula nunc vel finibus gravida.</p>
                        <p></p>
                    </div>
                    <div className="col-2" ></div>
                    <div className="col-5" style={{textAlign: "left"}}>
                        <p>Proin tincidunt malesuada nulla, sed ullamcorper dolor ullamcorper nec. Morbi ultrices sem et tortor consectetur, at rutrum felis pretium. Phasellus aliquam augue arcu. Integer egestas dui facilisis posuere hendrerit. Aliquam lobortis, sapien id accumsan feugiat, sem libero porttitor nulla, quis pretium lorem nulla ac augue. Etiam nibh augue, aliquet id varius non, feugiat nec lorem. Integer et sollicitudin enim. Curabitur sollicitudin suscipit dui sed tempus. Nullam sollicitudin dolor ut magna dictum, eu condimentum massa convallis. Nulla facilisi. Praesent blandit ac ligula ultricies dapibus. Quisque sed nisl pharetra, porta dui vulputate, tempor nisi. Morbi ac sem nisi. Morbi sit amet tellus tempor, auctor quam et, pharetra nunc.</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default BlogAbout