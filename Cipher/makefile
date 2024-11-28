# Makefile

CXX = g++
CXXFLAGS = -std=c++11 -Wall

SRCDIR = src
BINDIR = bin

SOURCES = $(wildcard $(SRCDIR)/*.cpp)
EXECUTABLE = $(BINDIR)/myprogram

all: cipher.exe 
		$(EXECUTABLE)

$(EXECUTABLE): $(SOURCES)
	@mkdir -p $(BINDIR)
	$(CXX) $(CXXFLAGS) $(SOURCES) -o $@

clean:
	rm -rf $(BINDIR)
