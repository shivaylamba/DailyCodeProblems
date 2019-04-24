def find_pair_sum(array, number):
    dict = {}
    for x in range(len(array)):
        if array[x] in dict:
            return True
        else:
            dict[number - array[x]] = array[x]

    return False


given = [10, 15, 3, 7]
wanted = 17
print(find_pair_sum(given, wanted))
