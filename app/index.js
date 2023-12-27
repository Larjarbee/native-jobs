import { Stack, useRouter } from 'expo-router';
import {
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
import { icons } from '../constants';
import Welcome from '../components/home/welcome/Welcome';
import PopularJobs from '../components/home/popular/PopularJobs';
import NearbyJobs from '../components/home/nearby/NearbyJobs';
import { useCallback, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension='60%'
              handlePress={toggleSidebar}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.avatar} dimension='90%' />
          ),
          headerTitle: '',
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          <PopularJobs />
          <NearbyJobs />
        </View>
      </ScrollView>
      <Modal
        animationType='slide'
        // presentationStyle='pageSheet'
        transparent={true}
        visible={showSidebar}
        onRequestClose={() => setShowSidebar(!showSidebar)}
      >
        <SafeAreaView style={styles.modal}>
          <View style={{ padding: 20 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => setShowSidebar(!showSidebar)}
              >
                <MaterialIcons name='close' size={22} />
              </TouchableOpacity>
            </View>

            <View style={styles.list}>
              {LISTS.map((list, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setShowSidebar(!showSidebar)}
                  style={styles.listItem}
                >
                  <Text style={{ color: COLORS.primary }}>{list}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  modal: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
  },
  listItem: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
  },
});

const LISTS = ['Home', 'About', 'Contact'];
