import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import temp from './temp.json';
import {DatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import FolderIcon from '@material-ui/icons/Folder';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
//import CircularProgress from '@material-ui/core/CircularProgress';
import CommentDetail from './Componentes/CommentDetail';
import faker from 'faker';
import ApproveCard from './Componentes/ApprovalCard';
import SessionDisplay from './Componentes/SessionDisplay';
import Spinner from './Componentes/Spinner';
import SearchBar from './Componentes/SearchBar';
import unsplash from './API/unsplash'
import ImageList from './Componentes/ImageList';
import YoutubeAPI from './API/YoutubeAPI';
import SearchBarYoutube from './Youtube-Browser-App/SearchBarYoutube';
import VideoList from './Youtube-Browser-App/VideoList';
import VideoDetails from './Youtube-Browser-App/VideoDetails';
import SongList from './Songs-App/SongList';
import SongDetails from './Songs-App/SongDetails';





let arrayName=[];
class App extends React.Component{
    constructor(props){
      super(props);
      this.state={
            query:'',
            matchedName:[],
            selectedDate:new Date(),
            selectedValue:'',
            buttonNavigationValue:'',
            tabValue:0,
            latitude:null,
            errorMessage:'',
            images:[],
            videos:[],
            selectedVideo:null,
      }
      // const useStyles = makeStyles((theme) => ({
      //   root: {
      //     flexGrow: 1,
      //   },
      //   menuButton: {
      //     marginRight: theme.spacing(2),
      //   },
      //   title: {
      //     flexGrow: 1,
      //     display: 'none',
      //     [theme.breakpoints.up('sm')]: {
      //       display: 'block',
      //     },
      //   },
      //   search: {
      //     position: 'relative',
      //     borderRadius: theme.shape.borderRadius,
      //     backgroundColor: fade(theme.palette.common.white, 0.15),
      //     '&:hover': {
      //       backgroundColor: fade(theme.palette.common.white, 0.25),
      //     },
      //     marginLeft: 0,
      //     width: '100%',
      //     [theme.breakpoints.up('sm')]: {
      //       marginLeft: theme.spacing(1),
      //       width: 'auto',
      //     },
      //   },
      //   searchIcon: {
      //     padding: theme.spacing(0, 2),
      //     height: '100%',
      //     position: 'absolute',
      //     pointerEvents: 'none',
      //     display: 'flex',
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //   },
      //   inputRoot: {
      //     color: 'inherit',
      //   },
      //   inputInput: {
      //     padding: theme.spacing(1, 1, 1, 0),
      //     // vertical padding + font size from searchIcon
      //     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      //     transition: theme.transitions.create('width'),
      //     width: '100%',
      //     [theme.breakpoints.up('sm')]: {
      //       width: '12ch',
      //       '&:focus': {
      //         width: '20ch',
      //       },
      //     },
      //   },
      // }));
      
      //const classes = useStyles();
      // console.log("useStyle", useStyles)
    };
    componentDidMount(){
      window.navigator.geolocation.getCurrentPosition(
        (position)=> this.setState({latitude:position.coords.latitude}),
        (err)=>{this.setState({errorMessage:err.message})}
      );

      this.onTermSubmit('songs');
      
    }
    
  
    handleChange = (event, newValue) => {
      console.log("newValue : ", newValue);
      this.setState({tabValue:newValue});
    };
   
    clickedMe=()=>{alert("you clicked me");}
    searchData=()=>{
      temp.map(item=>{
        console.log("item",item);
        return item;
      });
    }

    changeData=(e)=>{
          this.setState({query:e.target.value.toLowerCase()});
          console.log("query",this.state.query);

          if(this.state.query!==''){
             let firstName= temp.map((item)=>{ 
               return(
                 [
                 this.Id=item.id,
                 this.FirstName=item.first_name.toLowerCase(),
                 this.LastName=item.last_name,
                 this.Gender=item.gender,
                 this.Email=item.email,
                 this.IpAddress=item.ip_address
                 ]
             );
                 
                });
                 console.log("firstName",firstName);
               arrayName=firstName.filter((i)=>{return this.state.query===i[1]});
             console.log("arrayName",arrayName);
              this.setState({matchedName:arrayName});


          }
          console.log("matchedName",this.state.matchedName);

    }

    changedDate=(e)=>{
            this.setState({selectedDate:e});
            console.log("e  : ",e);
    }


    renderContent(){
        if(this.state.latitude && !this.state.errorMessage){ 
          return (
          <div> <SessionDisplay latitude={this.state.latitude}/></div>
          );
        }
        if(!this.state.latitude && this.state.errorMessage){
          return (
          <div>Error:{this.state.errorMessage}</div>
          );
        }

        if(!this.state.errorMessage && !this.state.latitude){
          return (
            <div> <Spinner message="Please accept location request"/></div>
          );
        }
    };
    
    onSearchSubmit= async(term)=>{
      console.log(term);

      const res = await unsplash.get('/search/photos',{
        params:{query:term},
        

      });
      this.setState({images:res.data.results});
    }

     onTermSubmit= async (term)=>{
       const response=await YoutubeAPI.get('/search',{
          params:{
            part:'snippet',
            maxResults:5,
            key:'AIzaSyAxGfjxNW4ps678zArB80APm1uHwQC7AXk',
            q:term
          }
        });
        this.setState({videos:response.data.items,selectedVideo:response.data.items[0]});
    };

    onSelectedVideo =(video)=>{
      this.setState({selectedVideo:video});

    };
    render(){
    
      return(
        <div style={{textAlign:"center"}}>
            <h4>App Bar with a primary search field</h4>
          <div>  
              {/* className="root"> */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography  variant="h6" noWrap>
          {/* className={classes.title} */}
            Material-UI
          </Typography>
          <div> 
            {/* className={classes.search}> */}
            <div >
              {/* className={classes.searchIcon}> */}
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              // classes={{
              //   root: classes.inputRoot,
              //   input: classes.inputInput,
              // }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    
        </div>
          <br/>
          <h1 style={{textAlign:"center"}}>Hello World !</h1>
          <Box component="span" m={1} > 
            <Button variant="contained"  style={{padding:"5px", marginRight:"15px"}} onClick= {this.clickedMe}> Click Me</Button> 
            <Button variant="contained" color="primary" style={{padding:"5px", marginRight:"15px"}}>Primary</Button>
            <Button variant="contained" color="secondary" style={{padding:"5px", marginRight:"15px"}}>Secondary</Button>
            <Button variant="contained"  style={{padding:"5px", marginRight:"15px"}}>disabled</Button>
            <Button variant="contained" color="secondary" href="https://www.google.com/">Link</Button>
          </Box>
          <br/>
          <br/>
          <br/>
          <Container maxWidth="sm">Container</Container>
          <br/>
          <br/>
          <Grid container spacing={5}>
        <Grid item xs={12} style={{textAlign:"center", padding:"5px", border:"1px"}}>
          <Paper>xs=12</Paper>
        </Grid>
        <Grid item xs={6} style={{textAlign:"center", padding:"5px"}}>
          <Paper >xs=6</Paper>
        </Grid>
        <Grid item xs={6} style={{textAlign:"center", padding:"5px"}}>
          <Paper>xs=6</Paper>
        </Grid>
        <Grid item xs={3} style={{textAlign:"center", padding:"5px"}}>
          <Paper >xs=3</Paper>
        </Grid>
        <Grid item xs={3} style={{textAlign:"center", padding:"5px"}}>
          <Paper>xs=3</Paper>
        </Grid>
        <Grid item xs={3} style={{textAlign:"center", padding:"5px"}}>
          <Paper >xs=3</Paper>
        </Grid>
        <Grid item xs={3} style={{textAlign:"center", padding:"5px"}}>
          <Paper >xs=3</Paper>
        </Grid>
      </Grid>
     <br/> 
     <br/>
      <div> 
          <label>Select Me : </label>
          <Checkbox 
          
                defaultChecked
                onChange={item=>{return item}}
                color="primary"
          />
      </div>
        <br/>
        <br/>
      <h4>Fetch data from text file</h4>
      <br/>
        <TextField id="standard-basic" label="type here to search..." style={{marginRight:"15px"}}  onChange={this.changeData} ref={input=>this.search=input}/>
      <Button variant="contained" color="primary" onClick={this.searchData}>Search</Button>
        <br/>
        <br/>
        <br/>
        <div>
                  {/* {this.state.matchedName!==''? this.state.matchedName :""} */}

                  <ul>
          {this.state.matchedName.map(item => (
            <li key={item}> {item[0] } <br/>
                 {item[1] } <br/>
                 {item[2] } <br/>
                 {item[3] } <br/>
                 {item[4] } <br/>
                 {item[5] } <br/>
            </li>
          ))}
        </ul>
        </div>
        <br/>
        <div> <h4>Date Picker</h4>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker 
                label="Select Date"
                format="dd/mm/yyyy"
                value={this.state.selectedDate} 
                onChange={this.changedDate}
                inputVariant="outlined"
            />
          </MuiPickersUtilsProvider>
        </div>
        <br/>
        <div><h4>Radio Button</h4>
              <RadioGroup>
              <label>A :
                <Radio
                name="Demo-A"
                value="A"
                color="primary"
                onChange={this.onChangedRadio=(e)=>{this.setState({selectedValue:e.target.value})}}
                 checked={this.state.selectedValue==='A'}
                />
                </label>
                <label>B :
                <Radio
                     name="Demo-B"
                     value="B"
                     color="primary"
                     onChange={this.onChangedRadio=(e)=>{this.setState({selectedValue:e.target.value})}}
                      checked={this.state.selectedValue==='B'}
                />
                </label>
                <label>C :
                <Radio
                     name="Demo-C"
                     value="C"
                     color="primary"
                     onChange={this.onChangedRadio=(e)=>{this.setState({selectedValue:e.target.value})}}
                      checked={this.state.selectedValue==='C'}
                      
                />
                </label>
              </RadioGroup> 
          <div> You have selected : {this.state.selectedValue}</div>
        </div>
        <br/>
        <div><h4>Bottom Navigation</h4>
              <BottomNavigation value={this.state.buttonNavigationValue} onChange={this.onChangedNavigation=(e, newValue)=>{this.setState({buttonNavigationValue:newValue})}}>
                  <BottomNavigationAction icon={<RestoreIcon/>} value="recentes" label="Recents" />
                  <BottomNavigationAction icon={<FavoriteIcon/>} value="favorites" label="Favorites"/>
                  <BottomNavigationAction icon={<LocationOnIcon/>} value="location" label="Location"/>
                  <BottomNavigationAction icon={<FolderIcon/>} value="folder" label="Folder"/>
              </BottomNavigation>
              <br/>
              <br/>
              <div> You have selected : {this.state.buttonNavigationValue}</div>
        </div>
        <br/>
        <div> <h4> Tab</h4>
                <Tabs
                  value={this.state.tabValue}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                 >
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
          </Tabs>
          <br/>
          <div> You have selected : {this.state.tabValue}</div>
        </div>

        <br/>
       <div>
         <h4> Paper</h4>
         <Paper elevation={0} />
         <Paper />
         <Paper elevation={3} /> 
       </div>
       <br/>

       {/* <div > <h4> Progress Bar</h4>
      <CircularProgress />
      <CircularProgress color="secondary" />
    </div> */}
    <br/>
    <br/>
    <div className="ui container comments">

    <ApproveCard>
      <h4>Warning!</h4>
      <div>Are you sure want to do this?</div>
    </ApproveCard>
      <ApproveCard>
          <CommentDetail 
          author="Mahesh" 
          timeAgo="Today at 2:00PM" 
          content="Nice blog post" 
          avatar={faker.image.avatar()}
          />
      </ApproveCard>
      <ApproveCard>
          <CommentDetail 
              author="Sam"  
              timeAgo="Today at 9:00AM" 
              content="I like the subject" 
              avatar={faker.image.avatar()}
          />
       </ApproveCard>
       <ApproveCard>
          <CommentDetail 
              author="Jack" 
              timeAgo="Today at 4:20PM" 
              content="I like the writing" 
              avatar={faker.image.avatar()}
          />
       </ApproveCard>
      
    </div>
        <div> <h1>Applicatin for Accessing geo-location</h1>
          {this.renderContent()}
        </div>

        <br/>
        <div className="ui container" style={{marginTop:"10px"}}> <h1>Applicatin for searching images</h1>
          <SearchBar onSubmit={this.onSearchSubmit} />
            <ImageList images={this.state.images}/>
          </div>
            <br/>
            <br/>
          <div className="ui container">
                <h1>Youtube Browser Application</h1>
                  <SearchBarYoutube onTermSubmit={this.onTermSubmit} />
                  <div className="ui grid">
                    <div className="ui row">
                  <div className="eleven wide column"><VideoDetails video={this.state.selectedVideo}/></div>
                  <div className="five wide column"><VideoList videos={this.state.videos} onSelectedVideo={this.onSelectedVideo} /></div>
                  </div>
                  </div>
          </div>
          <br/>
          <div className="ui container grid"> <h1>Applicatin for song selection</h1>
            <div className="ui row">
              <div className="column eight wide">
                <SongList />
            </div>
            <div className="column eight wide">
                <SongDetails />
            </div>
            </div>
          </div>
    </div> 
      );
    }
}

export default App;
