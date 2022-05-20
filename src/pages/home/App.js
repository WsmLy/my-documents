import './App.css';
import {Component} from "react";
import FileViewer from "react-file-viewer";

class App extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            fileType: '',
            fileName: '',
            isOpen: false
        }
    }

    showContent = (item, i) => {
        this.setState({
            fileType: item.fileType,
            fileName: item.fileName,
            isOpen: true
        })
    }

    dismissContent = () => {
        this.setState({
            fileType: '',
            fileName: '',
            isOpen: false
        })
    }

    render() {

        const menuData = require('../../data/menu.json') || []
        const {fileName, fileType, isOpen} = this.state
        return (
            <div className="App">
                <h1 className="menu">
                    目录
                </h1>
                {menuData.map((item, i) => {
                    return <div className="menu-item" key={'menu_' + i} onClick={() => {
                        this.showContent(item, i)
                    }}>{item.title}</div>
                })}
                {isOpen && <div className="file-dialog" onClick={() => {
                    this.dismissContent()
                }}>
                    <FileViewer
                        fileType={fileType}
                        filePath={require('data/' + fileName)}
                    />
                </div>}
            </div>
        );
    }
}

export default App;
