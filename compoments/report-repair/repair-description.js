import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Button from '../button';
import imageToBase64 from 'image-to-base64/browser';

const RepairDescription = ({handleChange, values}) => {
  const [error, setError] = useState({});
  const [selectedImage, setSelectedImage] = useState(values.description?.photo);
  const [fileExtension, setFileExtension] = useState(values.description?.fileExtension);
  const [base64img, setBase64img] = useState(values.description?.base64img);
  const [text, setText] = useState(values.description?.text)
  const [textAreaCount, setTextAreaCount] = React.useState(0);
  const textLimit = 255

  function textTooLong() {
    setError({
      text: `Description must be ${textLimit} characters or fewer`,
      img: error.img
    });
  }

  const TextChange = (e) => {
    setText(e.target.value)
    setTextAreaCount(e.target.value.length);
    if (e.target.value.length > textLimit) {
      return textTooLong()
    }
    setError({text: false, img: error.img})
  }

  const Continue = () => {
    if (textAreaCount > textLimit) {
      return textTooLong()
    }
    if (text) {
      return handleChange('description', {
        photo: selectedImage,
        text: text,
        fileExtension: fileExtension,
        base64img: base64img
      });
    }
    setError({text: 'Required', img: error.img})
  }

  const PhotoChange = (event) => {
    const file = event.target.files[0]
    if (file.type !== 'image/jpeg') {
      return setError({img: 'The selected file must be a JPG', text: error.text})
    }
    let size = (file.size / 1024 / 1024).toFixed(2);
    if (size > 10) {
      return setError({
        img: `The selected file must be smaller than 10MB. Your file size is: ${size}MB`,
        text: error.text
      })
    }
    const image = URL.createObjectURL(file)
    imageToBase64(image)
      .then(
        (response) => {
          setBase64img(response);
          setSelectedImage(image);
          setFileExtension(file.name.split('.').pop());
          setError({img: false, text: error.text});
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }

  return <div className="govuk-grid-row" data-cy="repair-description">
    <div className="govuk-grid-column-two-thirds">
      <h1 className="govuk-heading-l">
        Describe your problem in more detail
      </h1>
      <div className={error.text ? 'govuk-form-group--error' : 'govuk-form-group'}>
        <form action="" className='govuk-!-padding-0'>
          <label className="govuk-label" htmlFor="description">
            <div>
              <p>Please describe:</p>
              <ul className="govuk-list govuk-list--bullet">
                <li>the size and location of the problem</li>
                <li>the source of the problem</li>
                <li>how long you have been experiencing the problem</li>
                <li>how many items are damaged, for example 3 floor tiles</li>
              </ul>
              <div className="govuk-inset-text">
                Please report <strong>only one problem</strong> at a time. You will have
                a chance to report another repair after this one.
              </div>
            </div>
          </label>
          <span id={'description-error'}
            className="govuk-error-message">
            {error.text}
          </span>
          <textarea className="govuk-textarea govuk-!-margin-bottom-0" id="description"
            name="description" type="text" onChange={TextChange} defaultValue={text}
            rows="5"></textarea>
          <div id="with-hint-info"
            className="govuk-hint govuk-character-count__message  govuk-!-margin-bottom-6"
            aria-live="polite">You have {textLimit - textAreaCount} characters remaining
          </div>
        </form>
      </div>
      <h3 className="govuk-heading-m">
        Upload a photo (optional)
      </h3>
      <div className={error.img ? 'govuk-form-group--error' : 'govuk-form-group'}>
        <label className="govuk-label" htmlFor="upload-a-photo">
          Upload a file
        </label>
        <span id="upload-a-photo-error" className="govuk-error-message">
          {error.img}
        </span>
        {selectedImage ? (
          <table>
            <tbody>
              <tr>
                <td align="center" valign="center">
                  <img alt="not fount" width="200px" src={selectedImage} />
                </td>
                <td align="center" valign="center">
                  <button
                    className="govuk-button govuk-button--warning"
                    onClick={()=>setSelectedImage(null)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <input className="govuk-file-upload govuk-file-upload--error"
            id="upload-a-photo" name="upload-a-photo" type="file"
            aria-describedby="upload-a-photo-error" onChange={PhotoChange}/>
        )}
      </div>
      <br/>
      <Button onClick={Continue} >Continue</Button>
    </div>
  </div>
};



RepairDescription.propTypes = {
  storeAddresses: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default RepairDescription;
