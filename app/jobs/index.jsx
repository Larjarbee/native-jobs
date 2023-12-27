import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import styles from './jobs.styles';
import JobsCard from './JobsCard';
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn';
import { COLORS, SIZES, icons } from '../../constants';
import { Stack } from 'expo-router';
import useFetch from '../../hooks/useFetch';

const Jobs = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: '1',
  });

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === 'right') {
      setPage(page + 1);
      handleSearch();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: '',
        }}
      />
      {isLoading ? (
        <ActivityIndicator size='large' color={COLORS.primary} />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <JobsCard
              job={item}
              handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
            />
          )}
          keyExtractor={(item) => item.job_id}
          contentContainerStyle={{
            padding: SIZES.medium,
            rowGap: SIZES.medium,
          }}
          ListHeaderComponent={() => (
            <>
              <View style={styles.container}>
                <Text style={styles.searchTitle}>All Jobs</Text>
              </View>
            </>
          )}
          ListFooterComponent={() => (
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination('left')}
              >
                <Image
                  source={icons.chevronLeft}
                  style={styles.paginationImage}
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{page}</Text>
              </View>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination('right')}
              >
                <Image
                  source={icons.chevronRight}
                  style={styles.paginationImage}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Jobs;
