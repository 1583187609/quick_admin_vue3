type NaturalNumber = number; // 包含0和所有的正整数
/** 字段类型***/
// tinyint(1字节)、smallint(2字节)、mediumint(3字节)、int(4字节)、integer(4字节)、bigint(8字节)、float(4字节)、double(8字节)
type NumberType = "tinyint" | "smallint" | "mediumint" | "int" | "integer" | "bigint" | "float" | "double"; // 数字类型
// date(3字节，YYYY-MM-DD)，datetime(8字节，YYYY-MM-DD HH:MM:SS)，time(3字节，HH:MM:SS), year(1字节，YY或YYYY)，timestamp(4字节，yyyymmddhhmmss);
type DateType = "date" | "datetime" | "time" | "year" | "timestamp";
// char(1字节)、varchar（2字节）
type CharType = "char" | "varchar";
// tinytext（1字节）、text（2字节）、mediumtext（3字节）、longtext(4字节）
type TextType = "tinytext" | "text" | "mediumtext" | "longtext";
// tinyblob(1字节)、blob(2字节)、mediumblob(3字节)、longblob(4字节)
type BlobType = "tinyblob" | "blob" | "mediumblob" | "longblob";
type FieldType = NumberType | DateType | CharType | TextType | BlobType; // 字段类型
type VirtualType = string; // 虚拟类型

interface Field {
  /*** 数据库存在的字段 ***/
  type: FieldType; // 字段类型
  length: NaturalNumber; // 长度。为数字类型时：指显示位宽（占用空间是固定的，与设置的 n 无关）。为char类型时，char(n)为定长字符串，会占用n字符空间；varchar(n)为可变字符串，n最大存储字符数；
  decimal: NaturalNumber; // 小数点位数
  notNull: boolean; // 不允许为空（null）
  isPrimaryKey: boolean; // 是否是主键
  remark: string; // 备注
  defaultValue: string | number | boolean; // 默认值
  isAutoIncrement: boolean; // 是否自动递增
  isUnsigned: boolean; // 是否无符号。 为true时，表式该列不接受负值
  isFillZero: boolean; // 是否填充
  // 虚拟，暂时不启用此功能
  // virtual: {
  //   type: VirtualType; // 虚拟类型
  //   expression: string; // 表单式
  // };
  /*** 功能需求新增的字段 ***/
  enums: Record<number, string>; // 枚举类型
}
