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
            isOpen: false,
            menuData: []
        }
    }

    showMenu = (item) => {
        this.setState({
            menuData: require("../../data/" + item.link) || []
        })
    }

    dismissMenu = () => {
        this.setState({
            menuData: []
        })
    }

    showContent = (item) => {
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

        const groupData = require('../../data/group.json') || []
        const {fileName, fileType, isOpen, menuData = []} = this.state
        return (
            <div className="App">
                <h1 className="menu">
                    目录
                </h1>
                {menuData.length > 0 && <div onClick={() => {
                    this.dismissMenu()
                }}>返回</div>}
                {menuData.length <= 0 && groupData.map((item, i) => {
                    return <div className="menu-item" key={'group_' + i} onClick={() => {
                        this.showMenu(item)
                    }}>{item.title}</div>
                })}
                {menuData.map((item, i) => {
                    return <div className="menu-item" key={'menu_' + i} onClick={() => {
                        this.showContent(item)
                    }}>{item.title}</div>
                })}
                {isOpen && <div className="file-dialog">
                    <div className='file-dialog-close' onClick={()=>{this.dismissContent()}}>关闭</div>
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
